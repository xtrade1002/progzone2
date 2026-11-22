import React, { useState } from "react";
import Layout from "../Components/Layout.jsx";
import useTranslations from "../lib/useTranslations.js";

const ChevronIcon = ({ className, direction = "down" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "up" ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
  </svg>
);

const ChevronDown = (props) => <ChevronIcon {...props} />;
const ChevronUp = (props) => <ChevronIcon {...props} direction="up" />;

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
      <div className="mb-6 lg:mb-12" key={section?.key ?? title}>
        <h2 className="pz-cyan mb-4 text-center text-2xl font-black lg:mb-6">
          {title || t("menu.infos", "Infos")}
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#00eaff]/20 bg-black/18">
          {items.map((item, index) => {
            const itemIndex = startIndex + index;
            const contentBlocks = Array.isArray(item?.content)
              ? item.content
              : item?.content
              ? [item.content]
              : [];

            return (
              <div key={itemIndex} className="border-b border-[#00eaff]/12 last:border-b-0">
                <button
                  className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-base font-bold text-[var(--pz-pink)] transition hover:bg-[#00eaff]/8 hover:text-[#00eaff] lg:gap-4 lg:px-5 lg:py-4 lg:text-lg"
                  onClick={() => toggleItem(itemIndex)}
                >
                  <span>{item?.title ?? t("menu.infos", "Infos")}</span>
                  {openIndex === itemIndex ? (
                    <ChevronUp className="w-5 h-5 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 shrink-0" />
                  )}
                </button>
                {openIndex === itemIndex && (
                  <div className="px-3 pb-4 pt-1 lg:px-5 lg:pb-6 lg:pt-2">
                    <div className="space-y-4 leading-relaxed text-slate-300">
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
      <section className="pz-section w-[90%] max-w-5xl px-0 py-6 lg:w-full lg:px-6 lg:py-20">
        <h1 className="pz-title mb-6 text-center text-3xl font-black lg:mb-12 lg:text-4xl">
          {t("menu.infos", "Infos")}
        </h1>
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
          <p className="text-center text-slate-300">
            {t("infos.empty", "Content will be available soon.")}
          </p>
        )}
      </section>
    </Layout>
  );
}
