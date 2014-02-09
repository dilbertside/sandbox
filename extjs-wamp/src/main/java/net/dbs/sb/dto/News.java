package net.dbs.sb.dto;

import java.util.HashMap;
import java.util.Map;

import javax.validation.constraints.NotNull;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

/**
 * @author dbs on Feb 8, 2014 6:32:27 PM
 * @version 1.0
 * @since V0.1
 * 
 */
@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class News {

    @NotNull
    @JsonSerialize(using=DateTimeSerializer.class)
    @JsonDeserialize(using=DateTimeDeserializer.class)
    public DateTime pubDate;
    
    public String title, author, link, description, content, encoded;
    
    public News(){
        
    }
    /**
     * @param pubDate
     * @param title
     * @param encoded
     */
    public News(DateTime pubDate, String title, String encoded) {
        this.pubDate = pubDate;
        this.title = title;
        this.encoded = encoded;
    }
    
    protected Map<String,Object> any = new HashMap<String, Object>();
    
    @JsonAnyGetter
    public Map<String, Object> any() {
        return any;
    }

    @JsonAnySetter
    public void set(String name, Object value) {
        this.any.put(name, value);
    }
    
    @JsonIgnore
    public Object getValue(String key) {
        return any.get(key);
    }
    
    @JsonIgnore
    public boolean hasKey(String key) {
        return any.containsKey(key);
    }
}
