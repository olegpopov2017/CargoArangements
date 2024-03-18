#include <iostream>
#include <stdlib.h>
#include <sstream>
#include <cstdio>
#include <fstream>

#include "cpp-jsonlib/single_include/nlohmann/json.hpp"     //подключение библиотеки для обработки JSON "Nloahman lib"
#include "cpp-httplib/httplib.h"                            //подключение библиотеки для создания сервера "httplib"

#define CPPHTTPLIB_OPENSSL_SUPPORT


using json = nlohmann::json;
using namespace httplib;

std::string response_json = "";     //создаем переменную типа string для помещения в нее обработанных данных для отправки клиенту


int main(void)
{
    Server svr;

    svr.Post("/", [](const Request& req, Response &res)
                    {
                        json data_json = json::parse(req.body);     //создаем обьект "data_json" типа json.парсим в него данные из тела запроса от клиента "req.body"

                        std::ofstream out;                                 // создаем поток для записи
                        out.open("cuboid_from_client.json");               // создаем и открывем файл для записи в папке с проектом.каждый раз данные будут перезаписываться
                        if (out.is_open())
                            {
                            out << data_json.dump(4) << std::endl;     //через поток записываем в файл данные из "data_json"
                            }
                        out.close();

                        data_json["height_Z"] = 5;                       //меняем размеры грузового помещения везде на 5
                        data_json["length_X"] = 5;
                        data_json["width_Y"] = 5;

                        std::cout<<data_json<<std::endl;;                   //вывод пришедших данных в консоль. консрукция std::endl помогает выводить даже один объект

                        response_json = data_json.dump();                   //записываем в переменную "response_json" типа string измененные параметры.
                        res.set_content(response_json, "text/plain");       //Установка и отправка ответа к клиенту
                    }
                    );
    std::cout << "The server started 127.0.0.1 3000." << std::endl;
    svr.listen("127.0.0.1", 3000);  // команда на включение сервера.адрес и порт можно менять.
    return 0;
}




