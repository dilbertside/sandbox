project eds-form-JsonAnySetter

Library ExtDirecSpring
related to enhancement request https://github.com/ralscha/extdirectspring/issues/96


-------------------------------
+++++++++++++++++++++++++++++++
-------------------------------
prototype extjs-websocket

tentative to investigate/integrate 
Spring Framework 4.0.0 websockets with ExtJs 4.2.1

this project has been built from an archetype available at
mvn archetype:generate -DarchetypeCatalog=http://repository.rasc.ch

it uses an experimental embedded tomcat 8, if any problem with mvn repository 
from https://github.com/ralscha/embeddedtc
git clone https://github.com/ralscha/embeddedtc.git
git checkout tomcat8
mvn install

and run the app as java Application from StartTomcat.java

or run the app with Jetty 9.0.4
mvn jetty:run


Sources

Spring
http://blog.springsource.org/2013/05/22/spring-framework-4-0-m1-websocket-support/
https://github.com/rstoyanchev/spring-websocket-test
http://blog.springsource.org/2013/07/24/spring-framework-4-0-m2-websocket-messaging-architectures/
https://github.com/rstoyanchev/spring-websocket-portfolio

ExtJs
http://www.sencha.com/forum/showthread.php?171515-WebSocket-to-push-data-to-a-view

https://github.com/wilk/ExtJS-WebSocket

