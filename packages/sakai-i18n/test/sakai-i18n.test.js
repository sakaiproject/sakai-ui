import { loadProperties, tr } from '../src/sakai-i18n.js';
import { expect } from '@open-wc/testing';

describe("sakai-i18n tests", () => {

  const value = "nog{0}";
  const testUrl = "/sakai-ws/rest/i18n/getI18nProperties?locale=en_GB&resourceclass=org.sakaiproject.i18n.InternationalizedMessages&resourcebundle=test";

  beforeEach(() => {

    window.fetch = url => {

      if (url === testUrl) {
        return Promise.resolve({ text: () => Promise.resolve(`egg=${value}`)});
      } else {
        throw new Error("No bundle found");
      }
    };

    window.top.portal = { locale: 'en_GB' };
  });

  it ("loadProperties", async () => {

    let i18n = await loadProperties('test');
    expect(i18n.egg).to.equal(value);

    i18n = await loadProperties('test');
    expect(i18n.egg).to.equal(value);
  });

  it ("tr", async () => {

    const i18n = await loadProperties('test');
    expect(tr('test', 'egg')).to.equal(value);
  });

  it ("tr with object", async () => {

    const i18n = await loadProperties('test');
    expect(tr('test', 'egg', { "0": "gin" })).to.equal('noggin');
  });

  it ("tr with array", async () => {

    const prefix = "Ogg on";

    window.fetch = url => {

      if (url === testUrl) {
        return Promise.resolve({ text: () => Promise.resolve(`egg=${prefix} {} {}`)});
      } else {
        throw new Error("No bundle found");
      }
    };

    const i18n = await loadProperties({ bundle: 'test', cache: false });
    expect(tr('test', 'egg', ["the", "bog"])).to.equal(`${prefix} the bog`);
  });

  it ("caching", async () => {

    // This call should cache in sessionStorage
    let i18n = await loadProperties('test');
    expect(i18n.egg).to.equal(value);

    // Now override fetch to return a different result.
    window.fetch = url => {

      if (url === testUrl) {
        return Promise.resolve({ text: () => Promise.resolve('egg=bacon')});
      } else {
        throw new Error("No bundle found");
      }
    };

    // This should return from sessionStorage, not fetching at all.
    i18n = await loadProperties('test');
    expect(i18n.egg).to.equal(value);

    // Clear out sessionStorage and the existing promises object
    window.sessionStorage.removeItem("en_GBtest");
    if (window?.sakai?.translations?.existingPromises) {
      window.sakai.translations.existingPromises = {};
    }

    // This call should now fetch
    i18n = await loadProperties('test');
    expect(i18n.egg).to.equal('bacon');
  });
});
