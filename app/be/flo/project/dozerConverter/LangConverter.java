package be.flo.project.dozerConverter;

import be.flo.project.dto.LangDTO;
import org.dozer.CustomConverter;
import org.dozer.DozerConverter;
import play.Logger;
import play.i18n.Lang;

/**
 * Created by florian on 16/04/15.
 */
public class LangConverter extends DozerConverter<Lang, LangDTO> implements CustomConverter {

    public LangConverter() {
        super(Lang.class, LangDTO.class);
    }

    @Override
    public LangDTO convertTo(Lang lang, LangDTO langDTO) {

        if(lang==null){
            return null;
        }
        LangDTO dto = new LangDTO();

        dto.setCode(lang.code());
        dto.setLanguage(lang.language());

        Logger.info("LangConverter :"+lang+"/"+dto);
        return dto;
    }

    @Override
    public Lang convertFrom(LangDTO langDTO, Lang lang) {
        if(langDTO==null){
            return null;
        }
        return Lang.forCode(langDTO.getCode());
    }
}
