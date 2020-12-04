module.exports = function (eleventyConfig) {
  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: "11ty",
    },
    templateFormats: ["html", "md", "njk"],
    passthroughFileCopy: true,
  };
};
