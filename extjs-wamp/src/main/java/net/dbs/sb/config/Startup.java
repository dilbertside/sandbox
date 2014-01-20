package net.dbs.sb.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;

@Component
public class Startup implements ApplicationListener<ContextRefreshedEvent> {


	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	//@Transactional
	public void onApplicationEvent(ContextRefreshedEvent event) {

	}

}
