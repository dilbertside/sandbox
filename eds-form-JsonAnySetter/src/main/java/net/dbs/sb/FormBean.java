package net.dbs.sb;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class FormBean {

	private String osName;

	private String osVersion;

	private int availableProcessors;

	private String remarks;

	private Date date;

	public String getOsName() {
		return osName;
	}

	public void setOsName(String osName) {
		this.osName = osName;
	}

	public String getOsVersion() {
		return osVersion;
	}

	public void setOsVersion(String osVersion) {
		this.osVersion = osVersion;
	}

	public int getAvailableProcessors() {
		return availableProcessors;
	}

	public void setAvailableProcessors(int availableProcessors) {
		this.availableProcessors = availableProcessors;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "FormBean [osName=" + osName + ", osVersion=" + osVersion + ", availableProcessors="
				+ availableProcessors + ", remarks=" + remarks + ", date=" + date + "]";
	}

	protected Map<String,Object> any = new HashMap<String, Object>();
    
    @JsonAnyGetter
    public Map<String, Object> any() {
        return any;
    }

    /**
     * @param any the any to set
     */
    @JsonAnySetter
    public void setAny(Map<String, Object> any) {
        this.any = any;
    }
    
    @JsonIgnore
    public void setAny(String name, Object value) {
        any.put(name, value);
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
