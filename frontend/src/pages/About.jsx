import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetteraBox from "../components/NewsLetteraBox";  

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/6 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
            aperiam aliquam rem impedit officia deleniti repellat! Esse dolores,
            repellat ullam provident consequatur, vel facilis explicabo
            perferendis dicta, tempore expedita ratione!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum fuga
            praesentium odio totam. Tempora maiores fuga eos, aperiam
            accusantium iure neque impedit dicta hic dignissimos aut
            exercitationem odit a quidem?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            veritatis explicabo ipsa beatae. Deleniti corrupti iusto dolor magni
            perspiciatis! Voluptatem molestiae impedit voluptate maiores aliquid
            voluptatibus tempora eos aspernatur velit.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
            natus eius nobis alias iure minima, minus cum excepturi, nam
            voluptatibus sapiente saepe porro aliquam adipisci consequuntur
            sint! Cumque, debitis ad!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
            natus eius nobis alias iure minima, minus cum excepturi, nam
            voluptatibus sapiente saepe porro aliquam adipisci consequuntur
            sint! Cumque, debitis ad!
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam,
            natus eius nobis alias iure minima, minus cum excepturi, nam
            voluptatibus sapiente saepe porro aliquam adipisci consequuntur
            sint! Cumque, debitis ad!
          </p>
        </div>
      </div>
      <NewsLetteraBox />
    </div>
  );
};

export default About;
