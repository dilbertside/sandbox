package net.dbs.sb.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Random;
import java.util.concurrent.LinkedBlockingQueue;

import net.dbs.sb.dto.StoreReadRequest;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import ch.rasc.wampspring.EventMessenger;
import ch.rasc.wampspring.annotation.WampCallListener;
import ch.rasc.wampspring.message.CallMessage;
import ch.rasc.wampspring.message.WampMessageHeader;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;

@Service("ns")
public class NewsService {

    @Autowired
    private EventMessenger eventMessenger;
    
    private final Random random = new Random();
    Queue<DateTime> queue = new LinkedBlockingQueue<DateTime>(100);

    @WampCallListener({/*"news:read",*/ "http://localhost:8080/extjs-wamp/news#read"})
    public List<Map<String, Object>> newsRead(CallMessage callMessage, StoreReadRequest readRequest) throws Throwable {
        System.out.println("newsRead:" + callMessage.getHeader(WampMessageHeader.WEBSOCKET_SESSION_ID));

        List<Map<String, Object>> list = Lists.newArrayList();

        for (int i = 0; i < 4; i++) {
            list.add(buildNewsItem(DateTime.now(), "sticky news"));
            for (int j = 0; j < 10000; j++);//spend time
        }
        return list;
    }

    @Scheduled(fixedDelay = 10000)
    public void sendNews() {
        final DateTime now = DateTime.now();
        eventMessenger.sendToAll("news:oncreate", Collections.singletonList(buildNewsItem(now, "Life is good")));
        queue.offer(now);
    }
    
    @Scheduled(fixedDelay = 60000)
    public void updateNews() {
        DateTime dt = queue.peek();
        if(null != dt){
            List<Map<String, Object>> list = Lists.newArrayList();
            DateTime[] a = queue.toArray(new DateTime[queue.size()]);
            for (DateTime dateTime : a) {
                list.add(buildNewsItem(dateTime, "Updated news, Life is still good"));
            }
            eventMessenger.sendToAll("news:onupdate", list);
        }
    }
    
    @Scheduled(fixedDelay = 120000)
    public void removeNews() {
        List<Map<String, Long>> list = Lists.newArrayList();
        DateTime dt = queue.poll();
        while (dt != null && queue.size() >= 5){
            list.add(Collections.singletonMap("pubDate", dt.getMillis()));
            dt = queue.poll();
        }
        
        if(!list.isEmpty()){
            eventMessenger.sendToAll("news:ondestroy", list);
        }
    }

    private Map<String, Object> buildNewsItem(DateTime now, String content) {
        Map<String, Object> item = Maps.newHashMapWithExpectedSize(4);
        int val = random.nextInt();
        item.put("title", "News " + val);
        item.put("pubDate", now.getMillis());
        String encoded =
                "<div class='x-grid-rowbody'>" 
                + content + " at<br/>Date: <i>"+ now +"</i><br/>"
                +"</div>"
                ;
        item.put("encoded", encoded);
        return item;
    }

}
