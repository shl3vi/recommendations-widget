import { exec } from "child_process";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { jest } from "@jest/globals";

expect.extend({ toMatchImageSnapshot });
jest.setTimeout(30000);

describe("widget screenshots", () => {
  const testSiteUrl = "http://localhost:3001";
  let serverProcess;

  beforeAll(async () => {
    serverProcess = await servePage();

    await interceptRecommendationsRequest(page);
  });

  it("should load widget correctly", async () => {
    await page.goto(testSiteUrl, { waitUntil: "networkidle0" });
    await page.waitForSelector("#taboola-recommendations-widget");

    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });

  it("should load widget correctly in mobile view", async () => {
    await page.goto(testSiteUrl, { waitUntil: "networkidle0" });
    await page.waitForSelector("#taboola-recommendations-widget");
    await page.setViewport({ width: 500, height: 500 });

    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot();
  });

  afterAll(() => {
    serverProcess.kill();
  });
});

const servePage = async () => {
  const serverProcess = exec("serve dist -p 3001");
  await new Promise((r) => setTimeout(r, 2000));
  return serverProcess;
};

const interceptRecommendationsRequest = async (page) => {
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    if (request.url().indexOf("api.taboola.com") !== -1) {
      request.respond({
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        content: "application/json",
        body: JSON.stringify(mockResponse),
      });
    } else request.continue();
  });
};

const mockResponse = {
  list: [
    {
      description:
        "Дорожная инспекция Эквадора вернула испуганное животное в его естественную среду обитания после обнаружения на трассе в городе Кеведо",
      thumbnail: [
        {
          url: "http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fimg.gazeta.ru%2Ffiles3%2F217%2F8041217%2Fupload-12509251_1256469607700215_6381419283846037060_n-pic905-895x505-72614.jpg",
        },
      ],
      origin: "sponsored",
      url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__7e0e9cc1c1a164e6ac4566fdd9a0b5fb__9888e1afcaa8c994cb2b362897532afb&response.session=v2_55c21f7bfa49ed5f6a19b8d3d964dc7c_3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b_1678899211_1678899211_CNawjgYQswsY4tzDse4wIAEoATBmOIjrCkCukBBI1tLYA1D___________8BWABgAGiFy_Py5bHb8acBcAE&item.id=%7E%7EV1%7E%7E-3969903350954598781%7E%7E-wqID0cquqvt75xYCZcfb6ds45GqOqEDxt6miEBz7PM9ZEj1nSOh25J82sTDXEn1oWs157JoiAAXIKi9-eLaKG3GM7Q_aWDX9O8A-oTuarjB3pAXD2426g4yuaugyXYaN63gxaKde9rsWPArupdiqgPEfFLTNctf0R_0ZK-0Ze6XMD03TH1xiTaP_7kihTvnEgxKNHBPWCKI-EwAuGuq_cqPfnXoTfjJWjOuOKjQ5llzb1UUjkFNyhu-IeNM1dcRNyab8_O7SpPbM7bT5R5UNfYMvGGQJd4xdtosZjw7-6OPF8C2yPvlmbo_NIFLjI3JL_oNwT2ar9yKzDrB3_L1ng&item.type=video&sig=55867e75c730076ff4c920e8a5cf1cbf6c7baab59d8a&redir=http%3A%2F%2Fwww.gazeta.ru%2Fsocial%2Fphoto%2Fperepugannyi_lenivets_obnaruzhen_na_razdelitele_trassy_v_ekvadore.shtml%3Futm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCi_ycf5go714r0B%23tblciGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCi_ycf5go714r0B&ui=3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjMwOICc9ChAiOsKSK6QEFDW0tgDWP___________wFjCNA3EI5TGDBkYwjXFhDUHxgjZGMI3P__________ARDc__________8BGCRkYwjcChCgEBgWZGMI0zMQ0UQYNmRjCNIDEOAGGAhkYwiWFBCYHBgYZGMI9joQlk4YOWRjCO8DEIkHGAlkYwj0FBCeHRgfZGMIpCcQijUYL2R4AYABrE2IAd7_jNIBkAEXmAHi3MOx7jA",
    },
    {
      description:
        "Alors que sa collection avec Kate Moss sort à la fin du mois, Topshop a trouvé de quoi attiser encore plus notre curiosité. En collaboration avec le très joli site « Nowness », la marque a produit huit vidéos sur la Brindille. On y découvre ses amis les plus proches, mais aussi ceux qui...",
      thumbnail: [
        {
          url: "http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fcdn-elle.ladmedia.fr%2Fvar%2Fplain_site%2Fstorage%2Fimages%2Fmode%2Fles-news-mode%2Fautres-news%2Fkate-moss-racontee-par-ses-amis-2695715%2F46928926-5-fre-FR%2FBeth-Ditto-parle-de-sa-copine-Kate-Moss_reference.jpg",
        },
      ],
      origin: "sponsored",
      url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__7e0e9cc1c1a164e6ac4566fdd9a0b5fb__9888e1afcaa8c994cb2b362897532afb&response.session=v2_55c21f7bfa49ed5f6a19b8d3d964dc7c_3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b_1678899211_1678899211_CNawjgYQswsY4tzDse4wIAEoATBmOIjrCkCukBBI1tLYA1D___________8BWABgAGiFy_Py5bHb8acBcAE&item.id=%7E%7EV1%7E%7E-1513510138496128255%7E%7EnQnVG9RcaWLuK7_jeOD8WKds45GqOqEDxt6miEBz7PM9ZEj1nSOh25J82sTDXEn1oWs157JoiAAXIKi9-eLaKG3GM7Q_aWDX9O8A-oTuarjB3pAXD2426g4yuaugyXYaN63gxaKde9rsWPArupdiqgPEfFLTNctf0R_0ZK-0Ze6XMD03TH1xiTaP_7kihTvnEgxKNHBPWCKI-EwAuGuq_T281496MhA4iRmYZX-yGPNzb1UUjkFNyhu-IeNM1dcRNyab8_O7SpPbM7bT5R5UNe4VtfIDngSlhLqunWvQhJGPF8C2yPvlmbo_NIFLjI3JL_oNwT2ar9yKzDrB3_L1ng&item.type=video&sig=b609bb71b8b1ffc0312e69eb186454d4ade5761110ca&redir=http%3A%2F%2Fwww.elle.fr%2FMode%2FLes-news-mode%2FAutres-news%2FKate-Moss-racontee-par-ses-amis-2695715%3Futm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjaiYCq4Jf_rJcB%23tblciGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjaiYCq4Jf_rJcB&ui=3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjMwOICc9ChAiOsKSK6QEFDW0tgDWP___________wFjCNA3EI5TGDBkYwjXFhDUHxgjZGMI3P__________ARDc__________8BGCRkYwjcChCgEBgWZGMI0zMQ0UQYNmRjCNIDEOAGGAhkYwiWFBCYHBgYZGMI9joQlk4YOWRjCO8DEIkHGAlkYwj0FBCeHRgfZGMIpCcQijUYL2R4AYABrE2IAd7_jNIBkAEXmAHi3MOx7jA",
    },
    {
      description:
        "The art of the street photograph as told by Neal Boenzi, who has been recently celebrated as one of the most inventive masters of the form.",
      thumbnail: [
        {
          url: "http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fgraphics8.nytimes.com%2Fimages%2F2013%2F11%2F06%2Farts%2Fvideo-boenzi%2Fvideo-boenzi-articleLarge.jpg",
        },
      ],
      origin: "sponsored",
      url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__7e0e9cc1c1a164e6ac4566fdd9a0b5fb__9888e1afcaa8c994cb2b362897532afb&response.session=v2_55c21f7bfa49ed5f6a19b8d3d964dc7c_3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b_1678899211_1678899211_CNawjgYQswsY4tzDse4wIAEoATBmOIjrCkCukBBI1tLYA1D___________8BWABgAGiFy_Py5bHb8acBcAE&item.id=%7E%7EV1%7E%7E1631141830268233219%7E%7EuQK6scrOQztRnK6fzXYH2lLBaC8_Gv2ol-TfSjh6EXm9OSd03RFk211LqYDaWXBnlD6CtweKIb_hxshbJxLBaL3Gzi67IULKH_cPQniqvf34JR2BZr0JwlZJK_n38LmXBznfstAxgHxK10DUnx__IOZshTJzHV6HG2_zDL-kFQ3uqH8LQNpyiVBH8hx00qfHYm69l9tAxXfQduUNmvnDy16lfLZKXXpUeamt6LQalqz6k6o4O1fVWSBakQQzhaxW-75w4B9zo0LNlYMj49gmjmqKlsQ7jo7uqOz4SkPE6vhF1uDCUl2erKuhM8RA00SfKsaB9etpl-SrPFUjxgmI3Q&item.type=video&sig=be191c4d0b7facdef13c735945b7ce70ccde04b3516d&redir=http%3A%2F%2Fwww.nytimes.com%2Fvideo%2Fmultimedia%2F100000002534680%2Fneal-boenzi-photographer.html%3FplaylistId%3D1194811622182%26utm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjKzsCztpjV8QM%23tblciGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjKzsCztpjV8QM&ui=3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjMwOICc9ChAiOsKSK6QEFDW0tgDWP___________wFjCNA3EI5TGDBkYwjXFhDUHxgjZGMI3P__________ARDc__________8BGCRkYwjcChCgEBgWZGMI0zMQ0UQYNmRjCNIDEOAGGAhkYwiWFBCYHBgYZGMI9joQlk4YOWRjCO8DEIkHGAlkYwj0FBCeHRgfZGMIpCcQijUYL2R4AYABrE2IAd7_jNIBkAEXmAHi3MOx7jA",
    },
    {
      description:
        "Každému, kdo někdy použil internet, by mělo být zřejmé, že kočky jsou prostě báječné. Milujeme je a to je důvod, proč milujeme jejich focení. A když jsou tyto fotografie...",
      thumbnail: [
        {
          url: "http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fdobuhdo.com%2Fimages%2Fblog%2F3237fb393e.jpg",
          width: "730",
          height: "393",
        },
      ],
      origin: "sponsored",
      url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__7e0e9cc1c1a164e6ac4566fdd9a0b5fb__9888e1afcaa8c994cb2b362897532afb&response.session=v2_55c21f7bfa49ed5f6a19b8d3d964dc7c_3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b_1678899211_1678899211_CNawjgYQswsY4tzDse4wIAEoATBmOIjrCkCukBBI1tLYA1D___________8BWABgAGiFy_Py5bHb8acBcAE&item.id=%7E%7EV1%7E%7E-389015383221768346%7E%7EbVex3-n8x7tnLankldVt790MPl2b6jKvVIDTsdotZEzTxvAnL2wqac4MyzR7uD46gj3kUkbS3FhelBtnsiJV6MhkDZRZzzIqDobN6rWmCPA3hYz5D3PLat6nhIftiT1lwdxwdlxkeV_Mfb3eos_TQavImGhxk0e7psNAZxHJ9RLsGerDzOrQbQyEBS_OlLkUbMr0x89UvHrBOT-_31S1SFD2_NF2otb2Lg_TqPJ8iSDd3TEIutyWp-eHp0oAcsMIJiEcNXxswF7Dwl5oFv-OKNB7L6PAPPnDCWhCPfP5Hobm0KEpU1HY8MW0M8nfoYuL&item.type=video&sig=12f3c6f14cb7d53b1defdc273b3cf2c3f17996054c5d&redir=http%3A%2F%2Fdobuhdo.com%2Fcz%2F20-fotografii-kocek-porizenych-presne-ve-spravny-moment.html%3Futm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCisoYD7zPCEz1w%23tblciGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCisoYD7zPCEz1w&ui=3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjMwOICc9ChAiOsKSK6QEFDW0tgDWP___________wFjCNA3EI5TGDBkYwjXFhDUHxgjZGMI3P__________ARDc__________8BGCRkYwjcChCgEBgWZGMI0zMQ0UQYNmRjCNIDEOAGGAhkYwiWFBCYHBgYZGMI9joQlk4YOWRjCO8DEIkHGAlkYwj0FBCeHRgfZGMIpCcQijUYL2R4AYABrE2IAd7_jNIBkAEXmAHi3MOx7jA",
    },
    {
      description:
        "Nueva York (CNN) -\u2014 El beisbolista de los Yankees de Nueva York, Alex Rodríguez, quien recibió una suspensión de 162 juegos por dopaje, retiró este | Deportes, Entretenimiento, Estados Unidos, Latinoamérica | CNN",
      thumbnail: [
        {
          url: "http://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/http%3A%2F%2Fi2.cdn.turner.com%2Fcnn%2Fdam%2Fassets%2F140111194127-alex-rodriguez-story-top.jpg",
        },
      ],
      origin: "sponsored",
      url: "http://api.taboola.com/1.0/json/taboola-templates/recommendations.notify-click?app.type=desktop&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4&response.id=__7e0e9cc1c1a164e6ac4566fdd9a0b5fb__9888e1afcaa8c994cb2b362897532afb&response.session=v2_55c21f7bfa49ed5f6a19b8d3d964dc7c_3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b_1678899211_1678899211_CNawjgYQswsY4tzDse4wIAEoATBmOIjrCkCukBBI1tLYA1D___________8BWABgAGiFy_Py5bHb8acBcAE&item.id=%7E%7EV1%7E%7E-8869445183701511661%7E%7Eov923OAGFhDztdCFF_PpCqds45GqOqEDxt6miEBz7PM9ZEj1nSOh25J82sTDXEn1oWs157JoiAAXIKi9-eLaKG3GM7Q_aWDX9O8A-oTuarjB3pAXD2426g4yuaugyXYaN63gxaKde9rsWPArupdiqgPEfFLTNctf0R_0ZK-0Ze6XMD03TH1xiTaP_7kihTvnEgxKNHBPWCKI-EwAuGuq_WHnLKP5W9MMjaZk87F95Ahzb1UUjkFNyhu-IeNM1dcRNyab8_O7SpPbM7bT5R5UNTn3lH_4FyT_WZQbpNXBvY2PF8C2yPvlmbo_NIFLjI3JL_oNwT2ar9yKzDrB3_L1ng&item.type=video&sig=4143109002adaae449cb076189b3899d8849e18e50e7&redir=http%3A%2F%2Fcnnespanol.cnn.com%2F2014%2F02%2F08%2F112646%2F%3Futm_source%3Dtaboola%26utm_medium%3Dreferral%26tblci%3DGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjJlJD64LKA2k4%23tblciGiB3vSfX_cqvSKS0i5ra4W0YLX1I6oe3zvRVJwnJpuJirSC5BCjJlJD64LKA2k4&ui=3860d325-caf4-4874-83af-34d581e47d84-tuctb0b7d8b&cpb=GIkFIJz__________wEqFnRhYm9vbGFzeW5kaWNhdGlvbi5jb20yCHRyYzAwMjMwOICc9ChAiOsKSK6QEFDW0tgDWP___________wFjCNA3EI5TGDBkYwjXFhDUHxgjZGMI3P__________ARDc__________8BGCRkYwjcChCgEBgWZGMI0zMQ0UQYNmRjCNIDEOAGGAhkYwiWFBCYHBgYZGMI9joQlk4YOWRjCO8DEIkHGAlkYwj0FBCeHRgfZGMIpCcQijUYL2R4AYABrE2IAd7_jNIBkAEXmAHi3MOx7jA",
    },
  ],
};
