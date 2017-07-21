package io.swagger.api;

import io.swagger.model.CommandCategories;
import io.swagger.model.CommandCategory;

import io.swagger.annotations.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

@Api(value = "platform", description = "the platform API")
public interface PlatformApi {

    @ApiOperation(value = "", notes = "return an array of available command categories", response = CommandCategories.class, tags={ "Platform", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "list of command categories", response = CommandCategories.class) })
    @RequestMapping(value = "/platform/command/categories",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<CommandCategories> getCommandCategories();


    @ApiOperation(value = "", notes = "returns the commands supported by controller devices", response = CommandCategory.class, tags={ "Platform", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Devices configured with specified role", response = CommandCategory.class) })
    @RequestMapping(value = "/platform/commands/byController",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<CommandCategory> getCommands(@ApiParam(value = "command categories to return") @RequestParam(value = "commandCategories", required = false) List<String> commandCategories,
        @ApiParam(value = "starting position, default") @RequestParam(value = "offset", required = false) Integer offset,
        @ApiParam(value = "maximum number of devices to return") @RequestParam(value = "limit", required = false) Integer limit);


    @ApiOperation(value = "", notes = "returns devices with the specified role", response = Integer.class, responseContainer = "List", tags={ "Platform", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Devices configured with specified role", response = Integer.class) })
    @RequestMapping(value = "/platform/devicesWithRole",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<List<Integer>> getDevicesByRole(@ApiParam(value = "roleId to search for") @RequestParam(value = "roleId", required = false) String roleId,
        @ApiParam(value = "starting position, default") @RequestParam(value = "offset", required = false) Integer offset,
        @ApiParam(value = "maximum number of devices to return") @RequestParam(value = "limit", required = false) Integer limit);


    @ApiOperation(value = "", notes = "returns roles for specified device", response = Integer.class, responseContainer = "List", tags={ "Platform", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Enabled roles", response = Integer.class) })
    @RequestMapping(value = "/platform/deviceRoles",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<List<Integer>> getRoles(@ApiParam(value = "deviceId of the device to query") @RequestParam(value = "deviceId", required = false) String deviceId);


    @ApiOperation(value = "", notes = "returns health status and metrics for the platform", response = Integer.class, responseContainer = "List", tags={ "Platform", })
    @ApiResponses(value = { 
        @ApiResponse(code = 200, message = "Enabled roles", response = Integer.class) })
    @RequestMapping(value = "/platform/status",
        produces = { "application/json" }, 
        consumes = { "application/json" },
        method = RequestMethod.GET)
    ResponseEntity<List<Integer>> getStatus();

}
