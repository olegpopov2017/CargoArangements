#include <iostream>
#include <stdlib.h>
#include <sstream>


#include "cpp-jsonlib/single_include/nlohmann/json.hpp"

#include "cpp-httplib/httplib.h"
#define CPPHTTPLIB_OPENSSL_SUPPORT


using json = nlohmann::json;
using namespace httplib;
//std::string data = 0;
//std::string d = "qqq";

int main(void) {
  Server svr;
    std::string s;
    svr.Post("/",[&](const Request &req, Response &res, const ContentReader &content_reader) {
        if (req.is_multipart_form_data())
        {
              // NOTE: `content_reader` is blocking until every form data field is read
            MultipartFormDataItems files;
              content_reader(
                [&](const MultipartFormData &file)
                    {
                      files.push_back(file);
                      return true;
                    },
                [&](const char *data, size_t data_length)
                    {
                      files.back().content.append(data, data_length);
                      return true;
                    });
        } else
        {
            std::string body;
            content_reader(
                [&](const char *data, size_t data_length)
                    {
                        body.append(data, data_length);
                        s = body;
                        return true;
                    });
        }
                        std::cout<<s;
      });


    //svr.Post("/", [](const Request & req, Response &res) { //По запросу к адресу 127.0.0.1/ Вернуть текст как страницу

    //j = json::parse(req.body);
    //std::cout << j;

    //});


  svr.listen("127.0.0.1", 3000);



  // 127.0.0.1, 3000 Ип куда розшарить, Ип вашого пк ну и порт какой то главное чтобы не был занят всякими торрентами иле open server
  //Команда запускает цикл так что в реальных проектах в отдельный процесс её
    //std::cout << "Server start at 127.0.0.1 port:3000";
  //Проверок не делаем , по этому если программа просто завершала роботу то нужно использовать правильный ип
  //список можно получить командой в консоли ipconfig берем ип lan иле wlan
  }




