const visit = require('unist-util-visit');

module.exports = (options) => {
    var acHtml = `
    <div class="border-solid border-4 container-inner mx-auto py-16 pb-8 text-center text-xl">
    <h2 class="text-2xl font-bold mb-8">Upcoming Course: SignalR Mastery</h2>
    <p>I'm building a new video course designed to help you become a master with SignalR and embracing real-time web applications.  Join the list and you'll be notified as soon as we go live around January 13th!</p>
    <div class="w-4/5 mx-auto mb-8">
      <form id="ctaForm">
        <div>
          <input
            type="text"
            name="fullname"
            id="ctaFormFullName"
            placeholder="Your name"
            class="w-full bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-green-700 z-10"
            required
          />
          <div class="mt-5">
          <input
            type="email"
            name="email"
            id="ctaFormEmailAddress"
            placeholder="Your email address"
            class="w-full bg-background-form rounded sm:rounded-r-none px-4 py-4 leading-normal border border-border-color-primary sm:border-r-0 shadow outline-none focus:border-green-700 z-10"
            required
          />
          </div>
          <button
            id="ctaFormButton"
            data-element="submit"
            class="w-40 uppercase bg-green-700 text-white rounded text-lg py-3 px-8 tracking-wide shadow focus:outline-none hover:bg-green-800 focus:bg-green-800 z-10 w-full sm:w-auto mt-5"
          >
            <span>Subscribe</span>
          </button>
        </div>
      </form>
    </div>
  </div>`;

    return tree => {
        visit(tree, 'inlineCode', node => {
            if (node.value.startsWith('cta:')) {
                node.type = 'html';
                node.value = acHtml;
            }
        });
    };
};