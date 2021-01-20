const visit = require('unist-util-visit');

module.exports = (options) => {
    var acHtml = `
    <div class="flex border-solid border-4 mx-auto text-center text-xl">
  <div class="w-1/3 m-2">
    <img src="https://consultwithgriff.com/assets/static/signalr-mastery-thumbnail.25ecf91.994421137c86d9fee2c6af9b9bf3fa2f.png" />
  </div>
  <div class="w-2/3 m-2">
    <h3 class="text-2xl font-bold">
      New Course: SignalR Mastery
    </h3>
    <p class="text-left my-5">
      This course is designed to teach you everything you've ever wanted to know about building real-time web applications with .NET.
    </p>
    <div class="">
      <a href="https://signalrmastery.com" class="" target="blank">Buy the Course</a>
    </div>
  </div>
</div>
`;

    return tree => {
        visit(tree, 'inlineCode', node => {
            if (node.value.startsWith('signalrmastery:')) {
                node.type = 'html';
                node.value = acHtml;
            }
        });
    };
};