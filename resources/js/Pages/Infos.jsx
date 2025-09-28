import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import Layout from "../Components/Layout.jsx";
import useTranslations from "../lib/useTranslations.js";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Infos() {
  const { trans, t } = useTranslations();
  const infos = trans?.infos ?? {};
  const sections = Array.isArray(infos.sections) ? infos.sections : [];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const renderContentBlock = (block, index) => {
    if (!block) {
      return null;
    }

    if (typeof block === "string") {
      return (
        <p
          key={index}
          dangerouslySetInnerHTML={{
            __html: block,
          }}
        />
      );
    }

    if (block.type === "paragraph") {
      return (
        <p
          key={index}
          dangerouslySetInnerHTML={{
            __html: block.text ?? "",
          }}
        />
      );
    }

    if (block.type === "list") {
      const items = Array.isArray(block.items) ? block.items : [];
      return (
        <ul key={index} className="list-disc list-inside space-y-2">
          {items.map((item, itemIndex) => (
            <li
              key={itemIndex}
              dangerouslySetInnerHTML={{
                __html: item ?? "",
              }}
            />
          ))}
        </ul>
      );
    }

    return null;
  };

  const renderSection = (section, startIndex) => {
    const title = section?.title ?? "";
    const items = Array.isArray(section?.items) ? section.items : [];

    return (
      <div className="mb-12" key={section?.key ?? title}>
        <h2 className="text-2xl font-bold text-center text-[#00f7ff] mb-6 drop-shadow-[0_0_10px_#00f7ff]">
          {title || t("menu.infos", "Infos")}
        </h2>
        <div className="divide-y divide-gray-700">
          {items.map((item, index) => {
            const itemIndex = startIndex + index;
            const contentBlocks = Array.isArray(item?.content)
              ? item.content
              : item?.content
              ? [item.content]
              : [];

            return (
              <div key={itemIndex}>
                <button
                  className="w-full flex justify-between items-center py-4 text-left text-lg font-semibold text-[#FF007A] hover:text-[#00f7ff] transition"
                  onClick={() => toggleItem(itemIndex)}
                >
                  <span>{item?.title ?? t("menu.infos", "Infos")}</span>
                  {openIndex === itemIndex ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {openIndex === itemIndex && (
                  <div className="pb-6 pt-2">
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      {contentBlocks.map((block, contentIndex) =>
                        renderContentBlock(block, contentIndex)
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  let itemOffset = 0;

  return (
    <Layout>
      <Head title={infos.meta_title ?? t("menu.infos", "Infos")} />
      <section className="max-w-6xl mx-auto px-6 py-20">
        {sections.length > 0 ? (
          sections.map((section) => {
            const renderedSection = renderSection(section, itemOffset);
            const itemsCount = Array.isArray(section?.items)
              ? section.items.length
              : 0;
            itemOffset += itemsCount;
            return renderedSection;
          })
        ) : (
          <p className="text-center text-gray-300">
            {t("infos.empty", "Content will be available soon.")}
          </p>
        )}
      </section>
    </Layout>
  );
}