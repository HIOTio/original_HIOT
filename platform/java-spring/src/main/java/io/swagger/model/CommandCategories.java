package io.swagger.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.model.CommandCategory;
import java.util.ArrayList;
import java.util.List;

/**
 * CommandCategories
 */
@javax.annotation.Generated(value = "class io.swagger.codegen.languages.SpringCodegen", date = "2017-07-21T22:26:37.427Z")

public class CommandCategories   {
  @JsonProperty("categories")
  private List<CommandCategory> categories = new ArrayList<CommandCategory>();

  public CommandCategories categories(List<CommandCategory> categories) {
    this.categories = categories;
    return this;
  }

  public CommandCategories addCategoriesItem(CommandCategory categoriesItem) {
    this.categories.add(categoriesItem);
    return this;
  }

   /**
   * Get categories
   * @return categories
  **/
  @ApiModelProperty(value = "")
  public List<CommandCategory> getCategories() {
    return categories;
  }

  public void setCategories(List<CommandCategory> categories) {
    this.categories = categories;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CommandCategories commandCategories = (CommandCategories) o;
    return Objects.equals(this.categories, commandCategories.categories);
  }

  @Override
  public int hashCode() {
    return Objects.hash(categories);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class CommandCategories {\n");
    
    sb.append("    categories: ").append(toIndentedString(categories)).append("\n");
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

