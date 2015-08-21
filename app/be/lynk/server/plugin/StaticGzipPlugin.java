package be.lynk.server.plugin;

import com.google.common.io.Files;
import play.Logger;
import play.Play;
import play.Plugin;
import play.libs.MimeTypes;
import play.mvc.Http;
import play.utils.Utils;
import play.vfs.VirtualFile;
import scala.reflect.io.VirtualFile;

import javax.print.attribute.standard.Compression;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Date;

import static org.jboss.netty.handler.codec.http.HttpHeaders.Names.*;
import static util.Compression.*;

public class StaticGzipPlugin extends Plugin {

    @Override
    public boolean serveStatic(VirtualFile file, Http.Request request, Http.Response response) {
        try {
            final File localFile = file.getRealFile();

            String contentType = MimeTypes.getContentType(localFile.getName(), "text/plain");
            // ignore images, I was having trouble when gzipping them. They probably don't need it anyway.
            if (contentType.contains("image")) return false;
            response.setContentTypeIfNotSet(contentType);
            response = addEtag(request, response, localFile);

            // minify
            String content = minify(request, response, localFile);

            // gzip only if supported and not excluded
            if (isGzipSupported(request) && !isExcludedAction(request)) {
                final ByteArrayOutputStream gzip = getGzipStream(content);
                // set response header
                response.setHeader("Content-Encoding", "gzip");
                response.setHeader("Content-Length", gzip.size() + "");
                response.out = gzip;
                return true;
            } else {
                response.out = new ByteArrayOutputStream(content.length());
                response.out.write(content.getBytes());
                return true;
            }
        } catch (Exception e) {
            Logger.error(e, "Error when Gzipping response: %s", e.getMessage());

        }
        return false;
    }

    private String minify(Http.Request request, Http.Response response, File file) throws IOException {
        String content = Files.toString(file, Charset.defaultCharset());
        if (!isExcludedAction(request)) {
            // select compression method by contentType
            if (response.contentType.contains("text/html")) {    // could be "text/html; charset=utf-8"
                return Compression.compressHTML(content);
            } else if (response.contentType.contains("text/xml")) {
                return Compression.compressXML(content);
            } else if (response.contentType.contains("text/css")) {
                return Compression.compressCSS(content);
            } else if (response.contentType.contains("text/javascript")
                    || response.contentType.contains("application/javascript")) {
                return Compression.compressJS(content);
            }
        }
        return content;
    }

    private static Http.Response addEtag(Http.Request request, Http.Response response, File file) {
        if (Play.mode == Play.Mode.DEV) {
            response.setHeader(CACHE_CONTROL, "no-cache");
        } else {
            String maxAge = Play.configuration.getProperty("http.cacheControl", "3600");
            if (maxAge.equals("0")) {
                response.setHeader(CACHE_CONTROL, "no-cache");
            } else {
                response.setHeader(CACHE_CONTROL, "max-age=" + maxAge);
            }
        }
        boolean useEtag = Play.configuration.getProperty("http.useETag", "true").equals("true");
        last = (file.lastModified() / 1000) * 1000
        final String etag = "\"" + last + "-" + file.hashCode() + "\"";
        if (!request.isModified(etag, last)) {
            if (request.method.equals("GET")) {
                response.status = Http.StatusCode.NOT_MODIFIED;
            }
            if (useEtag) {
                response.setHeader(ETAG, etag);
            }
        } else {
            response.setHeader(LAST_MODIFIED, Utils.getHttpDateFormatter().format(new Date(last)));
            if (useEtag) {
                response.setHeader(ETAG, etag);
            }
        }
        return response;
    }

}