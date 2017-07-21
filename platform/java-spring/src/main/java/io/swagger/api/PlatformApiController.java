package io.swagger.api;

import io.swagger.model.CommandCategories;
import io.swagger.model.CommandCategory;

import io.swagger.annotations.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

@Controller
public class PlatformApiController implements PlatformApi {

    public ResponseEntity<CommandCategories> getCommandCategories() {
        // do some magic!
        return new ResponseEntity<CommandCategories>(HttpStatus.OK);
    }

    public ResponseEntity<CommandCategory> getCommands(@ApiParam(value = "command categories to return") @RequestParam(value = "commandCategories", required = false) List<String> commandCategories,
        @ApiParam(value = "starting position, default") @RequestParam(value = "offset", required = false) Integer offset,
        @ApiParam(value = "maximum number of devices to return") @RequestParam(value = "limit", required = false) Integer limit) {
        // do some magic!
        return new ResponseEntity<CommandCategory>(HttpStatus.OK);
    }

    public ResponseEntity<List<Integer>> getDevicesByRole(@ApiParam(value = "roleId to search for") @RequestParam(value = "roleId", required = false) String roleId,
        @ApiParam(value = "starting position, default") @RequestParam(value = "offset", required = false) Integer offset,
        @ApiParam(value = "maximum number of devices to return") @RequestParam(value = "limit", required = false) Integer limit) {
        // do some magic!
        return new ResponseEntity<List<Integer>>(HttpStatus.OK);
    }

    public ResponseEntity<List<Integer>> getRoles(@ApiParam(value = "deviceId of the device to query") @RequestParam(value = "deviceId", required = false) String deviceId) {
        // do some magic!
        return new ResponseEntity<List<Integer>>(HttpStatus.OK);
    }

    public ResponseEntity<List<Integer>> getStatus() {
        // do some magic!
        return new ResponseEntity<List<Integer>>(HttpStatus.OK);
    }

}
