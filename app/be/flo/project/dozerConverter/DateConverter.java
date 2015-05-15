package be.flo.project.dozerConverter;

import org.dozer.CustomConverter;
import org.dozer.DozerConverter;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

/**
 * Created by florian on 2/05/15.
 */
public class DateConverter  extends DozerConverter<Date, LocalDateTime> implements CustomConverter {

    public DateConverter() {
        super(Date.class, LocalDateTime.class);
    }

    @Override
    public LocalDateTime convertTo(Date date, LocalDateTime localDateTime) {
        return LocalDateTime.ofInstant(date.toInstant(), ZoneId.systemDefault());
    }

    @Override
    public Date convertFrom(LocalDateTime localDateTime, Date date) {
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
}
