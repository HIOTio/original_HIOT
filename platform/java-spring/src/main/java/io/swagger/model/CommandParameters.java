package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.model.Parameter;
import java.util.ArrayList;
import java.util.List;

/**
 * CommandParameters
 */
@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

public class CommandParameters   {
  @JsonProperty("p")
  private List<Parameter> p = new ArrayList<Parameter>();

  public CommandParameters p(List<Parameter> p) {
    this.p = p;
    return this;
  }

  public CommandParameters addPItem(Parameter pItem) {
    this.p.add(pItem);
    return this;
  }

   /**
   * Get p
   * @return p
  **/
  @ApiModelProperty(value = "")
  public List<Parameter> getP() {
    return p;
  }

  public void setP(List<Parameter> p) {
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
    CommandParameters commandParameters = (CommandParameters) o;
    return Objects.equals(this.p, commandParameters.p);
  }

  @Override
  public int hashCode() {
    return Objects.hash(p);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CommandParameters {\n");
    
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

