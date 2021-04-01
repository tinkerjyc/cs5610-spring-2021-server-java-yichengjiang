package com.example.wbdvsp2102yichengjiangserverjava.services;

import com.example.wbdvsp2102yichengjiangserverjava.models.Widget;
import com.example.wbdvsp2102yichengjiangserverjava.repositories.WidgetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WidgetService {

  @Autowired
  WidgetRepository widgetRepository;

//     private List<Widget> widgets = new ArrayList<Widget>();
//    {
//        Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to Widgets");
//        Widget w2 = new Widget(123l, "ABC123", "HEADING", 1, "Welcome to Widgets");
//        Widget w3 = new Widget(234l, "ABC234", "PARAGRAPH", 1, "This is a paragraph");
//        Widget w4 = new Widget(345l, "ABC234", "HEADING", 2, "Welcome to WebDev");
//        Widget w5 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "Lorem ipsum");
//        widgets.add(w1);
//        widgets.add(w2);
//        widgets.add(w3);
//        widgets.add(w4);
//        widgets.add(w5);
//    }

  // implement crud operations
  public Widget createWidget(String tid, Widget widget) {
    widget.setTopicId(tid);
    return widgetRepository.save(widget);
//        widget.setId((new Date()).getTime());
//        widgets.add(widget);
//        return widget;
  }

  public List<Widget> findAllWidgets() {
    return (List<Widget>) widgetRepository.findAll();
//        return widgets;
  }

  public List<Widget> findWidgetsForTopic(String tid) {
    return widgetRepository.findWidgetForTopic(tid);
//        List<Widget> ws = new ArrayList<Widget>();
//        for(Widget w: widgets) {
//            if(w.getTopicId().equals(tid)) {
//                ws.add(w);
//            }
//        }
//        return ws;
  }

  public Widget findWidgetById(Long wid) {
    return widgetRepository.findWidgetById(wid);
//        for(Widget w: widgets) {
//            if(w.getId().equals(wid)) {
//                return w;
//            }
//        }
//        return null;
  }

  public int updateWidget(Long id, Widget newWidget) {
    Widget originalWidget = widgetRepository.findById(id).get();


    originalWidget.setText(newWidget.getText());
    widgetRepository.save(originalWidget);
    return 1;
//        for(int i=0; i<widgets.size(); i++) {
//            Widget w = widgets.get(i);
//            if(w.getId().equals(id)) {
//                widgets.set(i, newWidget);
//                return 1;
//            }
//        }
//        return -1;
  }

  public int deleteWidget(Long id) {
    widgetRepository.deleteById(id);
//        int index = -1;
//        for(int i=0; i<widgets.size(); i++) {
//            if(widgets.get(i).getId().equals(id)) {
//                index = i;
//                widgets.remove(index);
//                return 1;
//            }
//        }
//        return -1;
    return 1;
  }
}