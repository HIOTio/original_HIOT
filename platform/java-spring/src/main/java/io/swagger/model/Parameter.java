package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

/**
 * Parameter
 */
@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

public class Parameter   {
  @JsonProperty("name")
  private String name = null;

  @JsonProperty("value")
  private String value = null;

  @JsonProperty("required")
  private Boolean required = null;

  @JsonProperty("min")
  private Integer min = null;

  @JsonProperty("max")
  private Integer max = null;

  public Parameter name(String name) {
    this.name = name;
    return this;
  }

   /**
   * parameter name
   * @return name
  **/
  @ApiModelProperty(value = "parameter name")
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Parameter value(String value) {
    this.value = value;
    return this;
  }

   /**
   * this is the name of the datatype for the parameter
   * @return value
  **/
  @ApiModelProperty(value = "this is the name of the datatype for the parameter")
  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public Parameter required(Boolean required) {
    this.required = required;
    return this;
  }

   /**
   * Get required
   * @return required
  **/
  @ApiModelProperty(value = "")
  public Boolean getRequired() {
    return required;
  }

  public void setRequired(Boolean required) {
    this.required = required;
  }

  public Parameter min(Integer min) {
    this.min = min;
    return this;
  }

   /**
   * minimum value for numerics, min length for strings and byte arrays
   * @return min
  **/
  @ApiModelProperty(value = "minimum value for numerics, min length for strings and byte arrays")
  public Integer getMin() {
    return min;
  }

  public void setMin(Integer min) {
    this.min = min;
  }

  public Parameter max(Integer max) {
    this.max = max;
    return this;
  }

   /**
   * max value for numerics, max length for strings and byte arrays
   * @return max
  **/
  @ApiModelProperty(value = "max value for numerics, max length for strings and byte arrays")
  public Integer getMax() {
    return max;
  }

  public void setMax(Integer max) {
    this.max = max;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Parameter parameter = (Parameter) o;
    return Objects.equals(this.name, parameter.name) &&
        Objects.equals(this.value, parameter.value) &&
        Objects.equals(this.required, parameter.required) &&
        Objects.equals(this.min, parameter.min) &&
        Objects.equals(this.max, parameter.max);
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, value, required, min, max);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Parameter {\n");
    
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb.append("    required: ").append(toIndentedString(required)).append("\n");
    sb.append("    min: ").append(toIndentedString(min)).append("\n");
    sb.append("    max: ").append(toIndentedString(max)).append("\n");
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

