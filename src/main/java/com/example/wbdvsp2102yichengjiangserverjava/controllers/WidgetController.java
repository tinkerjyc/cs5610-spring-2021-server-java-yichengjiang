package com.example.wbdvsp2102yichengjiangserverjava.controllers;

import com.example.wbdvsp2102yichengjiangserverjava.models.Widget;
import com.example.wbdvsp2102yichengjiangserverjava.services.WidgetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {
  @Autowired
  WidgetService service;// = new WidgetService();

  @PostMapping("/api/topics/{tid}/widgets")
  public Widget createWidget(
          @PathVariable("tid") String tid,
          @RequestBody Widget widget) {
    //widget.setTopicId(topicId);
    return service.createWidget(tid, widget);
  }

  @GetMapping("/api/topics/{tid}/widgets")
  public List<Widget> findWidgetsForTopic(
          @PathVariable("tid") String tid
  ) {
    return service.findWidgetsForTopic(tid);
  }

  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping("/api/widgets/{wid}")
  public Widget findWidgetById(
          @PathVariable("wid") Long wid) {
    return service.findWidgetById(wid);
  }

  @DeleteMapping("/api/widgets/{wid}")
  public Integer deleteWidget(@PathVariable("wid") Long wid) {
    return service.deleteWidget(wid);
  }

  @PutMapping("/api/widgets/{wid}")
  public Integer updateWidget(
          @PathVariable("wid") Long wid,
          @RequestBody Widget widget) {
    return service.updateWidget(wid, widget);
  }
}
