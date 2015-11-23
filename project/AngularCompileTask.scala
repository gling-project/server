import java.io.PrintWriter

class AngularCompileTask {

    def execute() {
      println("Je suis le compiler")
        val compiler: AngularCompiler = new AngularCompiler
        compiler.compile()
//        try {
//            val writer: PrintWriter = new PrintWriter("public/javascripts/app.js", "UTF-8")
//            writer.print(result)
//            writer.close
//        }
//        catch {
//            case ex: Exception => {
//                println("Error while watching for angular changes but resuming watching.", ex)
//            }
//        }
    }

}
