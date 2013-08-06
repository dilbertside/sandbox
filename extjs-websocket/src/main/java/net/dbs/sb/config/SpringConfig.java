package net.dbs.sb.config;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import net.dbs.sb.websocket.echo.DefaultEchoService;
import net.dbs.sb.websocket.echo.EchoService;
import net.dbs.sb.websocket.echo.EchoWebSocketHandler;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.HttpRequestHandler;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.SimpleUrlHandlerMapping;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.WebSocketHttpRequestHandler;
import org.springframework.web.socket.sockjs.SockJsService;
import org.springframework.web.socket.sockjs.support.DefaultSockJsService;
import org.springframework.web.socket.sockjs.support.SockJsHttpRequestHandler;
import org.springframework.web.socket.support.PerConnectionWebSocketHandler;

@Configuration
@ComponentScan(basePackages = { "ch.ralscha.extdirectspring", "net.dbs.sb" })
@EnableWebMvc
@EnableScheduling
public class SpringConfig extends WebMvcConfigurerAdapter {

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Bean
    public EchoService echoService() {
        return new DefaultEchoService("Did you say \"%s\"?");
    }
	
	@Bean
	public MultipartResolver multipartResolver() {
		return new CommonsMultipartResolver();
	}

	@Bean
	public ClassPathResource randomdata() {
		return new ClassPathResource("/randomdata.csv.compressed");
	}


	@Bean
    public SimpleUrlHandlerMapping handlerMapping() {

	    DefaultSockJsService sockJsService = new DefaultSockJsService(taskScheduler());
        //sockJsService.setSockJsClientLibraryUrl("https://cdn.sockjs.org/sockjs-0.3.4.min.js");
        sockJsService.setSockJsClientLibraryUrl("http://localhost:8080/sockjs-0.3.4.min.js");
        //HttpRequestHandler requestHandler = new SockJsHttpRequestHandler(sockJsService, stompWebSocketHandler());
        Map<String, Object> urlMap = new HashMap<String, Object>();
        urlMap.put("/echo", new WebSocketHttpRequestHandler(echoWebSocketHandler()));
        //urlMap.put("/snake", new WebSocketHttpRequestHandler(snakeWebSocketHandler()));
        urlMap.put("/sockjs/echo/**", new SockJsHttpRequestHandler(sockJsService, echoWebSocketHandler()));
        //urlMap.put("/sockjs/snake/**", new SockJsHttpRequestHandler(sockJsService, snakeWebSocketHandler()));

        SimpleUrlHandlerMapping hm = new SimpleUrlHandlerMapping();
        hm.setOrder(-1);
        //hm.setUrlMap(Collections.singletonMap("/ws/**", requestHandler));
        hm.setUrlMap(urlMap);
        return hm;
    }
	
	// Task executor for use in SockJS (heartbeat frames, session timeouts)

    @Bean
    public ThreadPoolTaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler taskScheduler = new ThreadPoolTaskScheduler();
        taskScheduler.setThreadNamePrefix("SockJS-");
        taskScheduler.setPoolSize(4);
        return taskScheduler;
    }
    
    @Bean
    public WebSocketHandler echoWebSocketHandler() {
        return new PerConnectionWebSocketHandler(EchoWebSocketHandler.class);
    }
}
