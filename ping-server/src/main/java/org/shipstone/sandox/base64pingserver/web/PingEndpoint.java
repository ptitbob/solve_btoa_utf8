package org.shipstone.sandox.base64pingserver.web;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

/**
 * @author François Robert
 */

@RestController
@RequestMapping(value = "ping", produces = {MediaType.TEXT_PLAIN_VALUE})
@CrossOrigin(origins = "http://localhost:4200")
public class PingEndpoint {

  @GetMapping("decode")
  public String decode(
      @RequestHeader HttpHeaders httpHeaders
  ) {
    String password = httpHeaders.getFirst("password");
    return new String(Base64.getDecoder().decode(password.getBytes()));
  }

}
