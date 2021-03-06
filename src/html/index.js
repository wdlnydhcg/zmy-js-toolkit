// 注意：以下的工具函数有对body的引入都取于这里
const body = document.documentElement || document.body;

/**
 * 根据附加属性生成指定条件的正则表达式
 *
 * @param {object} attrs 附加属性
 * @returns {Array}
 * @author  MrAlenZhong
 * @date 2020-01-05 20:29:10
 */
const getAttrsReg = attrs => {
    const attrsReg = [];
    Object.keys(attrs).forEach(key => {
      if (attrs[key]) {
        attrsReg.push(new RegExp(`${key}\\s*=\\s*(['"])${attrs[key]}\\1`, "gim"));
      }
    });
    return attrsReg;
};

/**
 * 通过附加属性的筛选获取元素列表
 *
 * @param {Array}} list 元素列表
 * @param {object} attrs 附加属性值
 * @returns {Array}
 * @author  MrAlenZhong
 * @date 2020-01-05 20:29:10
 */
const getResultByAttr = (list, attrs) => {
    let result = [...list];
    const attrsReg = getAttrsReg(attrs);
    const res = [];
    attrsReg.forEach(attrReg => {
        result.forEach(item => {
        if (attrReg.test(item)) {
            res.push(item);
        }
        });
        result = res;
    });
    return result;
};

/**
 * 从文本中获取指定条件的标签
 *
 * @export
 * @param {source: string, tag: str, attrs?: object}
 * source: 需要解析的源文本
 * tag: 需要解析元素的tagName
 * attrs: 附加属性添加更快查询解析元素
 * @returns {Array}
 * @example:
 * getTagfromHtmlString({
    source: `
        <div class="container">
        <span>123</span>
        <div>
            <img src="/haha.jpg">
        </div>
        </div>
    `, 
    tag: 'img'
    })
    // => ["<img src="/haha.jpg">"]
 */
const getTagfromHtmlString = ({ source, tag, attrs = {} } = {}) => {
    if (!source) {
      console.warn("请添加source字段");
      return [];
    }
    if (!tag) {
      console.warn("请添加tag字段");
      return [];
    }
    const singleTags = "br,hr,img,input,param,meta,link".split(",");
    let reg = new RegExp(`<${tag}[^<>]*>[\\d\\D]*?<\/${tag}>`, "gmi");
    // 判断是否为但标签
    if (singleTags.includes(tag)) {
      reg = new RegExp(`<${tag}[^<>]*\/?>`, "gmi");
    }
    let result = source.match(reg);
    if (result && result.length && attrs && Object.keys(attrs).length) {
      result = getResultByAttr(result, attrs);
    }
    return result || [];
};


/**
 * 获取html文本中某类元素指定属性的属性值
 *
 * @export
 * @param {source: string, tag: str, attr: string, attrs?: object}
 * source: 需要解析的源文本
 * tag: 需要解析元素的tagName
 * attr: 需要获取属性值的解析元素的属性名称
 * attrs: 附加属性添加更快查询解析元素
 * @returns {Array}
 * @example:
    getAttrFromHtmlString({
    source: `
        <div class="container">
        <img src="/enen.jpg">
        <div>
            <img src="/haha.jpg">
            <span class="span-item">456</span>
        </div>
        </div>`, 
    tag: 'img', 
    attr: 'src'
    })
    // => ["/enen.jpg", "/haha.jpg"]
 */
const getAttrFromHtmlString = ({
    source,
    tag,
    attr,
    attrs = {}
} = {}) => {
    if (!source) {
      console.warn("请添加source字段");
      return [];
    }
    if (!tag) {
      console.warn("请添加tag字段");
      return [];
    }
    if (!attr) {
      console.warn("请添加attr字段");
      return [];
    }
    const result = getTagfromHtmlString({ source, tag, attrs });
    const attrList = result.map(item => {
      const reg = new RegExp(`${attr}\\s*=\\s*(['"])([^\\1]+?)\\1`, "gmi");
      const list = reg.exec(item);
      if (list && list.length > 1) {
        return list[2];
      }
      return "";
    });
    return attrList;
};



/**
 * 获取html文本中转化为html后的纯文本信息
 *
 * @export
 * @param {string} source 需要解析的源文本
 * @example 
 * getPureTextFromHtmlString('
    <div class="container">
        <img src="/enen.jpg">
        <div>
            <img src="/haha.jpg">
            <span class="span-item">456</span>
        </div>
    </div>')
// => "456"
 */
const getPureTextFromHtmlString = source =>
  source.replace(/<style[^>]*>[\d\D]*?<\/style>|<[^>]*>/g, "");

/**
 * 转义html
 * 说明：一般用于防止XSS攻击
 * @export
 * @param {string} str
 * @returns
 * @example 
 * escapeHtml('
 * <div class="container">
 *    <img src="/enen.jpg">
 *    <div>
 *      <img src="/haha.jpg">
 *      <span class="span-item">456</span>
 *    </div>
 * </div>')
// => "&lt;div class=&quot;container&quot;&gt;&lt;img src=&quot;/enen.jpg&quot;&gt;&lt;div&gt;&lt;img src=&quot;/haha.jpg&quot;&gt;&lt;span class=&quot;span-item&quot;&gt;456&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;"
 */
const escapeHtml = str => {
  const hash = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;"
  };
  return str.replace(/[&<>'"]/g, tag => hash[tag] || tag);
};


export default {
    getTagfromHtmlString,
    getAttrFromHtmlString,
    getPureTextFromHtmlString,
    escapeHtml
 
}


