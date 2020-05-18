const visit = require('unist-util-visit');

module.exports = (options) => {

    var acHtml = `
    <div class="border-solid border-4 container-inner mx-auto py-16 pb-8 text-center textl-xl">
    <h2 class="text-2xl font-bold mb-8">Live stream notifications? New posts? Thought-provoking conversations? Sign up today!</h2>

    <div class="w-4/5 mx-auto mb-8">
      <form method="POST" action="https://swiftkick.activehosted.com/proc.php" id="_form_10_">
        <input type="hidden" name="u" value="10" />
        <input type="hidden" name="f" value="10" />
        <input type="hidden" name="s" />
        <input type="hidden" name="c" value="0" />
        <input type="hidden" name="m" value="0" />
        <input type="hidden" name="act" value="sub" />
        <input type="hidden" name="v" value="2" />
        <input type="hidden" name="field[8]" value="${window.location.href}"
        <div>
          <input
            type="text"
            name="fullname"
            placeholder="Your name"
            class="w-full bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-green-700 z-10"
            required
          />
          <div class="mt-5">
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            class="w-full bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-green-700 z-10"
            required
          />
          </div>
          <button
            data-element="submit"
            class="w-40 uppercase bg-green-700 text-white rounded text-lg py-3 px-8 tracking-wide shadow focus:outline-none hover:bg-green-800 focus:bg-green-800 z-10 w-full sm:w-auto mt-5"
          >
            <span>Subscribe</span>
          </button>
        </div>
      </form>
    </div>
  </div>
  <script type="text/javascript">
    window.cfields = {"8", "ctalocation"};
  </script>`;

    return tree => {
        visit(tree, 'inlineCode', node => {
            if (node.value.startsWith('cta:')) {
                node.type = 'html';
                node.value = acHtml;
            }
        });
    };
};