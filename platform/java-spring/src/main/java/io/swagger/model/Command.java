package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.model.CommandParameters;
import java.util.ArrayList;
import java.util.List;

/**
 * Command
 */
@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

public class Command   {
  @JsonProperty("d")
  private String d = null;

  @JsonProperty("c")
  private String c = null;

  @JsonProperty("p")
  private List<CommandParameters> p = new ArrayList<CommandParameters>();

  public Command d(String d) {
    this.d = d;
    return this;
  }

   /**
   * device Id (16 character hex)
   * @return d
  **/
  @ApiModelProperty(value = "device Id (16 character hex)")
  public String getD() {
    return d;
  }

  public void setD(String d) {
    this.d = d;
  }

  public Command c(String c) {
    this.c = c;
    return this;
  }

   /**
   * command Id as specified by the device
   * @return c
  **/
  @ApiModelProperty(value = "command Id as specified by the device")
  public String getC() {
    return c;
  }

  public void setC(String c) {
    this.c = c;
  }

  public Command p(List<CommandParameters> p) {
    this.p = p;
    return this;
  }

  public Command addPItem(CommandParameters pItem) {
    this.p.add(pItem);
    return this;
  }

   /**
   * array of parameters
   * @return p
  **/
  @ApiModelProperty(value = "array of parameters")
  public List<CommandParameters> getP() {
    return p;
  }

  public void setP(List<CommandParameters> p) {
    this.p = p;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Command command = (Command) o;
    return Objects.equals(this.d, command.d) &&
        Objects.equals(this.c, command.c) &&
        Objects.equals(this.p, command.p);
  }

  @Override
  public int hashCode() {
    return Objects.hash(d, c, p);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Command {\n");
    
    sb.append("    d: ").append(toIndentedString(d)).append("\n");
    sb.append("    c: ").append(toIndentedString(c)).append("\n");
    sb.append("    p: ").append(toIndentedString(p)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

