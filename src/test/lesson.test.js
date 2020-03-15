import React from "react";
import Enzyme, {shallow} from "enzyme";
import Content from "../components/lesson/content";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({adapter: new Adapter()});

const index = 2;
const mockData=[
  {
    id:"8HpxFgrvJtarWtQI37FD",
    audio:"//ssffefwe",
    chinese: "再見",
    english: "goodbye",
    imgs: "https://images.unsplash.com/photo-1529268209110-62be1d87fe75?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk3MH0",
    pinyin: "zài jiàn",
    zhuyin: "ㄗㄞˋ　ㄐㄧㄢˋ"
  },
  {
    id: "iC5PmyWv0WB9sbL3OWf4",
    audio:"//sdsdssww",
    chinese: "這",
    english: "this",
    imgs: "https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjk3MH0",
    pinyin: "zhè",
    zhuyin: "ㄓㄜˋ"
  },
  {
    id: "scrRQePEdqB1puLFGliS",
    audio:"//skokpk",
    chinese: "謝謝",
    english: "thank",
    imgs: "https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    pinyin: "xiè xie",
    zhuyin: "ㄒㄧㄝˋ　ㄒㄧㄝˋ"
  }

]

describe("<Content/>", () => {
    const wrapper = shallow(<Content lesson={ mockData } index={ index } id="content"/>);
    it("match snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });
  
    it("match item of lesson", () => {
      expect(
        wrapper
          .find(".lessonDetail")
          .childAt(2)
          .text()
      ).toEqual("謝謝");
    });
  });