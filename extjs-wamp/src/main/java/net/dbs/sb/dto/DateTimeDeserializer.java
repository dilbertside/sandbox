package net.dbs.sb.dto;

import java.io.IOException;

import org.joda.time.DateTime;
import org.joda.time.format.ISODateTimeFormat;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class DateTimeDeserializer extends JsonDeserializer<DateTime> {
    
    final protected Class<?> _valueClass = DateTime.class;
    @Override
    public DateTime deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonToken t = jp.getCurrentToken();
          if (t == JsonToken.VALUE_NULL) {
              return null;
          }
          if (t == JsonToken.VALUE_NUMBER_INT) {
              return new DateTime(jp.getLongValue());
          }
          if (t == JsonToken.VALUE_STRING) {
              String text = jp.getText().trim();
              try {
                  return ISODateTimeFormat.date().parseDateTime(text);
                } catch (Exception e) {
                    try {
                        return ISODateTimeFormat.dateTime().parseDateTime(text);
                    } catch (Exception e2) {
                        throw ctxt.weirdStringException(text, _valueClass, "cannot deserialize, " + text + " format unrecognized");
                    }
                }
          }
          // Otherwise, no can do:
          throw ctxt.mappingException(_valueClass);
    }
}