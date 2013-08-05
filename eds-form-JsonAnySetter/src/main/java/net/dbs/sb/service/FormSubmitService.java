package net.dbs.sb.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.FORM_POST;

import java.lang.invoke.MethodHandles;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import ch.ralscha.extdirectspring.bean.ExtDirectFormPostResult;
import net.dbs.sb.FormBean;

@Service
public class FormSubmitService {

    private final static Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());
	@ExtDirectMethod(FORM_POST)
	public ExtDirectFormPostResult handleFormSubmit(
	        @RequestBody  MultiValueMap<String, String> body,
	        @Valid FormBean bean, 
	        MultipartFile screenshot) {
	    logger.debug("body [{}]", body.toSingleValueMap());
	    Assert.notEmpty(bean.any(), "@JsonAnySetter not filled");
		String resultString = "Server received: \n" + bean.toString();
		resultString += "\n";

		if (!screenshot.isEmpty()) {
			resultString += "ContentType: " + screenshot.getContentType() + "\n";
			resultString += "Size: " + screenshot.getSize() + "\n";
			resultString += "Name: " + screenshot.getOriginalFilename();
		}

		ExtDirectFormPostResult result = new ExtDirectFormPostResult();
		result.addResultProperty("response", resultString);
		return result;
	}
	
	@ExtDirectMethod(FORM_POST)
    public ExtDirectFormPostResult handleFormSubmitNoMultipartFile(
            @RequestBody  MultiValueMap<String, String> body,
            @Valid FormBean bean) {
        logger.debug("body [{}]", body.toSingleValueMap());
        Assert.notEmpty(bean.any(), "@JsonAnySetter not filled");
        String resultString = "Server received: \n" + bean.toString();
        resultString += "\n";

        ExtDirectFormPostResult result = new ExtDirectFormPostResult();
        result.addResultProperty("response", resultString);
        return result;
    }

	@InitBinder
	protected void initBinder(ServletRequestDataBinder binder) throws Exception {
		DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
		CustomDateEditor editor = new CustomDateEditor(df, true);
		binder.registerCustomEditor(Date.class, editor);
	}

}
