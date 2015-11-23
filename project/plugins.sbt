// Comment to get more information during initialization
logLevel := Level.Warn

// The Typesafe repository
resolvers += "Typesafe repository" at "http://repo.typesafe.com/typesafe/releases/"

resolvers += Resolver.url("bintray-tek-sbt-plugins",url("http://dl.bintray.com/tek/sbt-plugins"))(Resolver.ivyStylePatterns)

addSbtPlugin("tryp.sbt" % "sbt-jade" % "0.0.1")

// Use the Play sbt plugin for Play projects
addSbtPlugin("com.typesafe.play" % "sbt-plugin" % "2.2.4")