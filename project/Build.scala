import play.Project._
import sbt.Keys._
import sbt._

object ApplicationBuild extends Build {

  lazy val buildVersion = "2.2.4"
  lazy val playVersion = "2.2.4"

  val name = "project"
  val version = "1.0-SNAPSHOT"

  val appDependencies = Seq(
    javaCore,
    javaJdbc,
    javaJpa.exclude("org.hibernate.javax.persistence", "hibernate-jpa-2.0-api"),
    cache,
    "org.springframework" % "spring-context" % "4.1.6.RELEASE",
    "org.springframework" % "spring-context-support" % "4.1.6.RELEASE",
    "org.springframework" % "spring-expression" % "4.1.6.RELEASE",
    "org.springframework" % "spring-orm" % "4.1.6.RELEASE",
    "org.springframework" % "spring-test" % "4.1.6.RELEASE",
    //    "org.springframework.security" % "spring-security-core" % "4.1.6.RELEASE",
    "org.hibernate" % "hibernate-entitymanager" % "4.3.5.Final",
    //    "org.hibernate" % "hibernate-ehcache" % "4.3.5.Final",
    "org.apache.commons" % "commons-lang3" % "3.1",
    "org.hibernate.javax.persistence" % "hibernate-jpa-2.1-api" % "1.0.0.Final",
    "org.postgresql" % "postgresql" % "9.3-1101-jdbc41",
    "org.jasypt" % "jasypt" % "1.9.2",
    "commons-beanutils" % "commons-beanutils" % "1.9.2",
    "org.apache.velocity" % "velocity" % "1.7",
    "org.apache.commons" % "commons-email" % "1.3.1",
    "commons-io" % "commons-io" % "2.3",
    "com.amazonaws" % "aws-java-sdk" % "1.8.5",
    "net.sf.dozer" % "dozer" % "5.5.1",
    "com.jayway.facebooktestjavaapi" % "facebook-test-java-api" % "1.1.5",
    "com.mandrillapp.wrapper.lutung" % "lutung" % "0.0.5",
    "com.google.maps" % "google-maps-services" % "0.1.7",
    "org.slf4j" % "slf4j-api" % "1.7.7",
    "com.google.code.gson" % "gson" % "2.2.4",
    "org.slf4j" % "slf4j-api" % "1.7.7",
    "commons-httpclient" % "commons-httpclient" % "3.1",
    "com.google.code.geocoder-java" % "geocoder-java" % "0.16",
    "net.sourceforge.jexcelapi" % "jxl" % "2.6.12" excludeAll(
      ExclusionRule(organization = "com.sun.jdmk"),
      ExclusionRule(organization = "com.sun.jmx"),
      ExclusionRule(organization = "javax.jms")),
    "net.vz.mongodb.jackson" %% "play-mongo-jackson-mapper" % "1.1.0"
  )

  val main = play.Project(name, version, appDependencies)

  javaOptions ++= Seq("-Xmx512M", "-Xmx2048M", "-XX:MaxPermSize=2048M")

}