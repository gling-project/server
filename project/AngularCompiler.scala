import java.io.FileWriter
import java.util
import java.io.PrintWriter
import java.util.concurrent.{ExecutorService, Executors, TimeUnit}

import scalax.file.{Path, PathSet}

import de.neuland.jade4j.exceptions.JadeLexerException
import org.jcoffeescript._

class AngularCompiler {


    def compile() {

        val angular = Path.fromString("app/assets")
        val folder = Path.fromString("target/scala-2.10/resource_managed/main/public")

        val jades: PathSet[Path] = (angular / "js" ** "*.jade")

        List(jades).foreach { v =>
            compileFiles(v, folder)
        }
    }

    private def compileFiles(files: Iterable[Path], folder: Path): Unit = {
        val executor: ExecutorService = Executors.newFixedThreadPool(Runtime.getRuntime.availableProcessors() * 2 - 1)
        files.toList.foreach { v =>
            executor.execute(new Runnable {
                def run() {

                    println("compilation du fichier " + v.path)

                    compileFile(v, folder)
                }
            })
        }
        executor.shutdown()
        executor.awaitTermination(1, TimeUnit.HOURS)


    }
    private def compileFile(f: Path, folder: Path) {

        var targetExtension = ""
        val sourceExtension = f.path.split("\\.").last.toLowerCase

        if (sourceExtension == "coffee") {
            targetExtension = "js"
        }
        if (sourceExtension == "js") {
            targetExtension = "js"
        }
        if (sourceExtension == "jade") {
            targetExtension = "html"
        }
        if (sourceExtension == "html") {
            targetExtension = "html"
        }

        val targetPath = folder.path + f.path.replace("app/assets", "").split("\\.")(0) + "." + targetExtension

        println("compilation du fichier " + f.path + " vers " + targetPath)

        val tempFile = new java.io.File((folder / f).path.replaceAll("\\." + sourceExtension + "$", "." + targetExtension))

        synchronized {
            tempFile.getParentFile.mkdirs()
        }

        if (tempFile.exists() && tempFile.lastModified >= f.lastModified) {
        } else {
            var result = ""
            println("[COMPILING] " + f.path)

            try {
                if (sourceExtension == "coffee") {
                    val source = scala.io.Source.fromFile(f.path).getLines().mkString("\n")
                    result = new JCoffeeScriptCompiler(util.Arrays.asList(Option.BARE)).compile(source)
                }

                if (sourceExtension == "js") {
                    val source = scala.io.Source.fromFile(f.path).getLines().mkString("\n")
                    result = source
                }

                if (sourceExtension == "jade") {
                    result = de.neuland.jade4j.Jade4J.render(f.path, null)
                }

                if (sourceExtension == "html") {
                    val source = scala.io.Source.fromFile(f.path).getLines().mkString("\n")
                    result = source
                }

                //write file
                val writer: PrintWriter = new PrintWriter(targetPath, "UTF-8")
                writer.print(result)
                writer.close

            } catch {
                case e: Exception =>
                    println("[ERROR] " + f.path + " : " + e.getClass.getName + " => " + e.getMessage + "\n" + e.getStackTraceString)
            }
        }
    }

    //
    //    private def assembleTemplates(files: Iterable[Path], folder: Path, angular: Path) {
    //        val tempFile = new java.io.File((folder / "templates.js").path)
    //        tempFile.getParentFile.mkdirs()
    //
    //        var mustRemake = false
    //        for (f <- files) {
    //            if (!tempFile.exists || tempFile.lastModified < f.lastModified) {
    //                mustRemake = true
    //            }
    //        }
    //
    //        if (mustRemake) {
    //            println("[ASSEMBLING] " + (folder / "templates.js").path)
    //
    //            var result = "angular.module('app.directives').run(function($templateCache) {"
    //            for (f <- files) {
    //                // now, escape string so that it can be embedded as a variable
    //                val mapper: ObjectMapper = new ObjectMapper()
    //
    //                var url = ""
    //
    //                if (f.path.startsWith((Path.fromString(".tmp") / "sources" / angular / "directives").path)) {
    //                    // compute a decent url for the template
    //                    var usefulPath = f.path.substring((Path.fromString(".tmp") / "sources" / angular / "directives").path.length)
    //
    //                    // to dashed
    //                    val regex = "([a-z])([A-Z])"
    //                    val replacement = "$1-$2"
    //                    usefulPath = usefulPath.replaceAll(regex, replacement).toLowerCase
    //
    //                    // now split and format it correctly
    //                    var usefulPathParts = usefulPath.split("[/\\\\]")
    //                    usefulPathParts = usefulPathParts.slice(0, usefulPathParts.length - 1)
    //                    usefulPath = usefulPathParts.slice(usefulPathParts.length - 1, usefulPathParts.length).mkString
    //
    //                    url = "$/angular/templates/" + usefulPath + ".html"
    //                }
    //
    //                if (f.path.startsWith((Path.fromString(".tmp") / "sources" / angular / "views").path)) {
    //                    val usefulPath = f.path.substring((Path.fromString(".tmp") / "sources" / angular / "views").path.length)
    //                    url = "$/angular/views" + usefulPath
    //                }
    //
    //                val content = mapper.writeValueAsString(scala.io.Source.fromFile(f.path, "utf-8").getLines().mkString("\n"))
    //                result += "$templateCache.put('" + url + "', " + content + ");"
    //            }
    //            result += "});"
    //
    //            setContentIfDifferent(tempFile.getPath, result)
    //
    //        } else {
    //            println("[UP-TO-DATE] " + (folder / "templates.js").path)
    //        }
    //    }
    //
    //    private def concatenate(files: Iterable[Path], folder: Path) {
    //        val tempFile = new java.io.File((folder / "concatenated.js").path)
    //        tempFile.getParentFile.mkdirs()
    //
    //        var mustRemake = false
    //        for (f <- files) {
    //            if (!tempFile.exists || tempFile.lastModified < f.lastModified) {
    //                mustRemake = true
    //            }
    //        }
    //
    //        if (mustRemake) {
    //            println("[CONCATENATING] " + (folder / "concatenated.js").path)
    //            var result = ""
    //            for (f <- files) {
    //                result += scala.io.Source.fromFile(f.path, "utf-8").getLines().mkString("\n")
    //            }
    //            setContentIfDifferent(tempFile.getPath, result)
    //        } else {
    //            println("[UP-TO-DATE] " + (folder / "concatenated.js").path)
    //        }
    //    }
    //
    //    def setContentIfDifferent(path: String, content: String) {
    //
    //        var same = false
    //        try {
    //            val existingContent = scala.io.Source.fromFile(path).getLines().mkString("\n")
    //            same = (existingContent == content)
    //        } catch {
    //            case e: Exception =>
    //        }
    //
    //        if (!same) {
    //            val fw = new FileWriter(path)
    //            fw.write(content)
    //            fw.close()
    //        }
    //    }


}


