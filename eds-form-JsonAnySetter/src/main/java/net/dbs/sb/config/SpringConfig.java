package net.dbs.sb.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.ClassUtils;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan(basePackages = { "ch.ralscha.extdirectspring", "net.dbs.sb" })
@EnableWebMvc
public class SpringConfig extends WebMvcConfigurerAdapter {

    private static final boolean jsonAnySetterPresent = ClassUtils.isPresent("com.fasterxml.jackson.annotation.JsonAnySetter", WebMvcConfigurationSupport.class.getClassLoader());

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	@Bean
	public MultipartResolver multipartResolver() {
		return new CommonsMultipartResolver();
	}

	@Bean
	public ClassPathResource randomdata() {
		return new ClassPathResource("/randomdata.csv.compressed");
	}

	@Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        Map<String, MediaType> medias = new HashMap<String, MediaType>();
        if (jsonAnySetterPresent)
            medias.put("json", MediaType.valueOf("application/json"));
        configurer.mediaTypes(medias);
    }
}
