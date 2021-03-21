package com.example.wbdvsp2102yichengjiangserverjava.models;

public class Widget {
  private String name;
  private Long id;
  private String type;
  private Integer widgetOrder;
  private String text;
  private Integer size;
  private Integer width;
  private Integer height;
  private String cssClass;
  private String style;
  private String value;
  private String src, url;
  private String topicId;

  public Widget(Long id, String topicId, String type, Integer size, String text) {
    this.id = id;
    this.type = type;
    this.text = text;
    this.size = size;
    this.topicId = topicId;
  }

  public Widget() {

  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public String getTopicId() {
    return topicId;
  }

  public void setTopicId(String topicId) {
    this.topicId = topicId;
  }
}