#include <iostream>
#include "./cpp-httplib/httplib.h"

#define CPPHTTPLIB_OPENSSL_SUPPORT



using namespace httplib;

int main(void) {
  Server svr;


  svr.Get("/hi", [](const Request & /*req*/, Response &res) { //Про запросу к адресу 192.168.0.102:8080/hi Вернуть текст как страницу
    res.set_content("Hello World!", "text/plain"); //Текст для возврата и формат
  });

    svr.Post("/", [](const Request & req, Response &res) { //Про запросу к адресу 192.168.0.102:8080/ Вернуть текст как страницу
    //std::cout << "Request";
    std::cout << req.body;
    res.set_content("Main Pagessss!", "text/plain"); //Текст для возврата и формат
  });



  //Команда запускает цикл так что в реальных проектах в отдельный процесс её
  svr.listen("127.0.0.1", 3000); // 127.0.0.1, 3000 Ип куда розшарить, Ип вашого пк ну и порт какой то главное чтобы не был занят всякими торрентами иле open server

  //Проверок не делаем , по этому если программа просто завершала роботу то нужно использовать правильный ип
  //список можно получить командой в консоли ipconfig берем ип lan иле wlan
  }




