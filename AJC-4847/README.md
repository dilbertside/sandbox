###Project starter to demonstrate the following issue

[Document how to combine AspectJ compile time weaving with our annotation processor](https://github.com/spring-projects/spring-boot/issues/4847) 


###Made with Boot starter
http://start.spring.io/starter.zip?name=AJC-4847&amp;groupId=com.example&amp;artifactId=demo&amp;version=0.0.1-SNAPSHOT&amp;description=Document+how+to+combine+AspectJ+compile+time+weaving+with+our+annotation+processor+https%3A%2F%2Fgithub.com%2Fspring-projects%2Fspring-boot%2Fissues%2F4847&amp;packageName=com.example&amp;type=maven-project&amp;packaging=jar&amp;javaVersion=1.7&amp;language=java&amp;bootVersion=1.3.1.RELEASE&amp;dependencies=cache&amp;dependencies=devtools&amp;dependencies=aop&amp;dependencies=security&amp;dependencies=data-jpa&amp;dependencies=thymeleaf&amp;dependencies=web

* Added to original starter the necessary Neo4J dependencies

* Entities hardcopy from project https://github.com/spring-projects/spring-data-book/tree/master/neo4j

###How to reproduce the compilation error
```
mvn clean compile
```
compile-fail.log has also the command printout.

###How to remove the compilation error 1st solution
comment in /AJC-4847/src/main/java/com/example/AppProperties.java line 16 starting by `@ConfigurationProperties`

Run again
```
mvn clean compile
```
no errors such as

```
[ERROR] Internal compiler error: java.lang.IllegalStateException: Failed to write metadata at org.springframework.boot.configurationprocessor.ConfigurationMetadataAnnotationProcessor.writeMetaData(ConfigurationMetadataAnnotationProcessor.java:385)
  /../AJC-4847/src/main/java/com/example/AppProperties.java:0
```
###How to remove the compilation error 2nd solution (suggested by @anaram)
comment following lines in pom.xml
```XML
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-configuration-processor</artifactId>
      <optional>true</optional>
    </dependency> 
```


Thing I notice is the following: 
[WARNING] Field value processing of @ConfigurationProperty meta-data is not supported

Having a look at the Annotation source code, doesn't give me any clue what could be wrong!


