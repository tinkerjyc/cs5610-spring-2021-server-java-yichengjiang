package com.example.wbdvsp2102yichengjiangserverjava.controllers;

import com.example.wbdvsp2102yichengjiangserverjava.models.Widget;
import com.example.wbdvsp2102yichengjiangserverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//@CrossOrigin(origins = "*")
@CrossOrigin
public class WidgetController {
  @Autowired
  WidgetService service;

  @PostMapping("/api/topics/{tid}/widgets")
  public Widget createWidget(
          @PathVariable String tid,
          @RequestBody Widget widget) {
    return service.createWidgetForTopic(tid, widget);
  }

  @GetMapping("/api/widgets")
  public List<Widget> findAllWidgets() {
    return service.findAllWidgets();
  }

  @GetMapping("/api/topics/{tid}/widgets")
  public List<Widget> findWidgetsForTopic(
          @PathVariable String tid) {
    return service.findWidgetsForTopic(tid);
  }

  @DeleteMapping("/api/widgets/{wid}")
  public Integer deleteWidget(
          @PathVariable("wid") Long id) {
    return service.deleteWidget(id);
  }

  @PutMapping("/api/widgets/{wid}")
  public Integer updateWidget(
          @PathVariable("wid") Long id,
          @RequestBody Widget widget) {
    return service.updateWidget(id, widget);
  }


}
