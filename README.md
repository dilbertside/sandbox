## demo extjs-wamp webapp

investigation to use Spring Framework 4 websockets with a sub-protocol WAMP.  
This implementation uses Sencha ExtJS extension capability as a way to manage WAMP rpc and subscription to produce a newsfeed in real time.
Frontend client ExtJS includes a WAMP manager (Ext.ux.ws.wamp.Manager) with a WAMP store and WAMP proxy.
CRUD functions are implemented on the feed.
create, update, delete topic subcriptions.
read rpc call for initial load.

Server uses Spring Framework 4 with wampspring library and run on Tomcat 7.0.50
	available on maven central ch.rasc:wampspring:1.0.1-SNAPSHOT
source code
	https://github.com/ralscha/wampspring

Reference:
WAMP
	http://wamp.ws/spec/
	http://autobahn.ws/js/reference/
SockJS - WebSocket emulation
	https://github.com/sockjs
Compact URI
	https://en.wikipedia.org/wiki/CURIE

Code contribution from
AutobahnExtJS 
	https://github.com/tavendo/AutobahnExtJS

spring4ws-demos 
	https://github.com/ralscha/spring4ws-demos

-------------------------------
+++++++++++++++++++++++++++++++
-------------------------------

## project eds-form-JsonAnySetter

Library ExtDirecSpring
related to enhancement request https://github.com/ralscha/extdirectspring/issues/96


-------------------------------
+++++++++++++++++++++++++++++++
-------------------------------
## demo extjs-websocket

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

