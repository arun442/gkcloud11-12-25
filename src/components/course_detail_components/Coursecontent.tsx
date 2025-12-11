import React, { Fragment, useState,useEffect } from "react";
import { axiosPrivate } from "@/common/axiosPrivate";
import { useParams, useRouter } from "next/navigation";
import useTrainingMode from "@/hooks/training_mode_hook";
import { axiosPublic } from "@/common/axiosPublic";
import useUserData from "@/hooks/userData";
import { toast } from "react-toastify";
import { FcReading } from "react-icons/fc";
import { LiaArrowAltCircleRight } from "react-icons/lia";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
 
const Content = ({ data }: { data: any }) => {
  const { userData } = useUserData();
  const { trainingData } = useTrainingMode();
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
 
  const entroll = async () => {
    if (userData == null) {
      return toast.info("Before enrollment Please login");
    }
    try {
      if (isLoading) {
        return;
      }
      setLoading(true);
      const result = await axiosPrivate.post("/lms/add-course-enrollment", {
        userId: userData.userId,
        courseId: data.courseId,
        courseCostPlanId: data.CourseCostPlans[0].courseCostPlanId,
        enrollmentReference: "This is Test Enrollment",
        amount:
          data.CourseCostPlans.length != 0 &&
          data.CourseCostPlans[0].offerId != null &&
          data.CourseCostPlans[0].offerPrice > 0
            ? data.CourseCostPlans[0].offerPrice
            : data.CourseCostPlans[0].planPrice,
      });
 
      setLoading(false);
      window.open(
        `${result.data.gateway.url}&encRequest=${result.data.gateway.encRequest}&access_code=${result.data.gateway.access_code}`,
        "_self"
      );
    } catch (error: any) {
      setLoading(false);
 
      toast.error(error!.message);
    }
  };
 
  const handleDownload = async (courseId: any, courseName: any, data: any) => {
    try {
      let response;
      if (data.broucherURL) {
        response = await axiosPublic.get(data.broucherURL, {
          responseType: "blob",
        });
      } else {
        response = await axiosPublic.get("/lms/course-download", {
          params: {
            courseId: courseId,
          },
          responseType: "blob",
        });
      }
 
      const blob = new Blob([response.data], { type: "application/pdf" });
 
      const url = window.URL.createObjectURL(blob);
 
      const link = document.createElement("a");
      link.href = url;
      link.download = `${courseName}.pdf`;
      document.body.appendChild(link);
      link.click();
 
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  const [index, setIndex] = useState(0);
  let [isOpen, setIsOpen] = useState(false);
  function closeModal(isDownloaded: any) {
    if (isDownloaded == true) {
      handleDownload(data.courseId, data.title, data);
    }
    setIsOpen(false);
  }
 
  function openModal() {
    setIsOpen(true);
  }
 
  const hasDescription = () => {
    const description = data?.CourseContent?.courseContent?.course?.courseDetails?.description;
    return (
      description?.description?.trim() ||
      description?.descriptionList?.some((item: any) =>
        item?.title?.trim() ||
        item?.titleListItems?.some((subItem: string) => subItem?.trim())
      )
    );
  };
 
  const hasObjectives = () => {
    const objectives = data?.CourseContent?.courseContent?.course?.courseDetails?.objectives;
    return (
      objectives?.description?.trim() ||
      objectives?.objectiveList?.some((item: string) => item?.trim())
    );
  };
 
  const hasAudience = () => {
    const audience = data?.CourseContent?.courseContent?.course?.courseDetails?.audience;
    return (
      audience?.description?.trim() ||
      audience?.audienceList?.some((item: string) => item?.trim())
    );
  };
 
  const hasPrerequisites = () => {
    const prerequisites = data?.CourseContent?.courseContent?.course?.courseDetails?.prerequisites;
    return (
      prerequisites?.description?.trim() ||
      prerequisites?.prerequisiteList?.some((item: string) => item?.trim())
    );
  };
 
  const getAvailablePages = () => {
    const pages = [];
    if (hasDescription()) pages.push({ name: "Curriculum Insights" });
    if (hasObjectives()) pages.push({ name: "Learning Goals" });
    if (hasAudience()) pages.push({ name: "Learners at a Glance" });
    if (hasPrerequisites()) pages.push({ name: "Foundational Skills" });
    return pages;
  };
 
  const availablePages = getAvailablePages();
  // const [activePage, setActivePage] = useState(availablePages[0]?.name || "");
  const [activePage, setActivePage] = useState<string | null>(null);

  useEffect(() => {
    if (availablePages.length > 0) {
      setActivePage(availablePages[0]?.name || "");
    }
  }, [data]);
  if (availablePages.length === 0) {     return null; }

  const renderContent = () => {
    switch (activePage) {
      case "Curriculum Insights":
        return (
          <div className="bg-teal-900 rounded-lg p-6 space-y-6 w-auto">
            <section className="space-y-6">
              <p className="text-emerald-100 text-sm leading-relaxed">
                {data?.CourseContent?.courseContent?.course?.courseDetails
                  ?.description?.description ?? ""}
              </p>
 
              {(
                data?.CourseContent?.courseContent?.course?.courseDetails
                  ?.description?.descriptionList ?? []
              ).map((e: any, index: any) =>
                (e?.title ?? e ?? "").length == 0 ? null : (
                  <div key={index} className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-emerald-300 font-small">
                        {index + 1}.
                      </span>
                      <p className="text-emerald-100 font-sm">
                        {e?.title ?? e}
                      </p>
                    </div>
                    {(e?.titleListItems ?? []).map(
                      (item: any, subIndex: any) => (
                        <div
                          key={`${index}${subIndex}`}
                          className="ml-8 flex items-start gap-2"
                        >
                          <span className="-mt-1"> →</span>
                          <p className="text-emerald-200 text-sm">{item}</p>
                        </div>
                      )
                    )}
                  </div>
                )
              )}
            </section>
 
            {/* Highlights Section */}
            {(
              data?.CourseContent?.courseContent?.course?.courseDetails
                ?.highlights?.highlightsList ?? []
            ).some(
              (highlight: { title: string; titleListItems: string[] }) =>
                highlight.title ||
                (highlight.titleListItems &&
                  highlight.titleListItems.some((item) => item))
            ) && (
              <section className="mt-8 space-y-6">
                <span className="text-xl font-semibold text-emerald-300">
                  Highlights
                </span>
                {data.CourseContent.courseContent.course.courseDetails.highlights.highlightsList.map(
                  (
                    highlight: { title: string; titleListItems: string[] },
                    index: number
                  ) =>
                    (highlight.title ||
                      highlight.titleListItems?.length > 0) && (
                      <div key={index} className="space-y-4">
                        {highlight.title && (
                          <span className="text-md font-medium text-emerald-200">
                            {highlight.title}
                          </span>
                        )}
                        {highlight.titleListItems?.length > 0 && (
                          <div className="space-y-3">
                            {highlight.titleListItems.map(
                              (item: string, subIndex: number) =>
                                item ? (
                                  <div
                                    key={subIndex}
                                    className="flex items-start gap-2"
                                  >
                                    <span className="-mt-0.5 text-emerald-200">
                                      →
                                    </span>
                                    <p className="text-emerald-100 text-sm">
                                      {item}
                                    </p>
                                  </div>
                                ) : null
                            )}
                          </div>
                        )}
                      </div>
                    )
                )}
              </section>
            )}
          </div>
        );
 
      case "Learning Goals":
        return (
          <div className="bg-teal-900 rounded-lg space-y-2 w-auto p-4">
            <p className="text-emerald-100 text-sm leading-relaxed">
              {data?.CourseContent?.courseContent?.course?.courseDetails
                ?.objectives?.description ?? ""}
            </p>
            <div className="flex flex-col gap-2">
              {(
                data?.CourseContent?.courseContent?.course?.courseDetails
                  ?.objectives?.objectiveList ?? []
              ).map((objective: any, index: any) =>
                (objective ?? "").length === 0 ? null : (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-teal-800/50 p-1 rounded-lg"
                  >
                    <span className="-mt-1"> →</span>
 
                    <p className="text-emerald-100 text-sm">{objective}</p>
                  </div>
                )
              )}
            </div>
          </div>
        );
 
      case "Learners at a Glance":
        return (
          <div className="bg-teal-900 rounded-lg p-6 space-y-3 w-auto">
            <p className="text-emerald-100 text-sm leading-relaxed">
              {data?.CourseContent?.courseContent?.course?.courseDetails
                ?.audience?.description ?? ""}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {(
                data?.CourseContent?.courseContent?.course?.courseDetails
                  ?.audience?.audienceList ?? []
              )
                .filter((audience: any) => audience && audience.trim())
                .map((audience: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 bg-teal-800/50 rounded-lg"
                  >
                    <span className="w-8 h-8 -mt-1 flex items-start justify-center bg-emerald-700 text-emerald-100 rounded-full">
                      →
                    </span>
                    <p className="text-emerald-100 text-sm">{audience}</p>
                  </div>
                ))}
            </div>
          </div>
        );
 
      case "Foundational Skills":
        const prerequisites =
          data?.CourseContent?.courseContent?.course?.courseDetails
            ?.prerequisites;
        const hasPrerequisites = prerequisites?.prerequisiteList?.some(
          (item: string) => item.trim() !== ""
        );
        return (
          <div className="bg-teal-900 rounded-lg p-4 space-y-6 w-auto">
            {prerequisites?.description && (
              <p className="text-emerald-100 text-sm leading-relaxed">
                {prerequisites.description}
              </p>
            )}
 
            {hasPrerequisites && (
              <div className="grid grid-cols-1 gap-4">
                {prerequisites.prerequisiteList
                  .filter((prerequisite: string) => prerequisite.trim() !== "")
                  .map((prerequisite: string, index: null | undefined) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 bg-teal-800/50 rounded-lg"
                    >
                      <span className="w-8 h-8 flex items-start justify-center bg-emerald-700 text-emerald-100 rounded-full">
                        <span className="-mt-1">→</span>
                      </span>
                      <p className="text-sm">{prerequisite}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        );
 
      default:
        return null;
    }
  };
 
  return (
    <div className="h-full w-full max-w-6xl mx-auto px-4 py-6 md:px-8">
      <div className="text-center mb-10">
        <p className="text-white text-2xl md:text-4xl">{data.title}</p>
      </div>
 
      <div className="flex flex-col md:flex-row gap-6">
        <nav className="w-full md:w-64 flex-shrink-0">
          <div className="bg-teal-900 rounded-lg p-4 space-y-4">
            {availablePages.map((page) => (
              <button
                key={page.name}
                onClick={() => setActivePage(page.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm
                  ${
                    activePage === page.name
                      ? "bg-[#88D66C] text-black"
                      : "bg-white text-black"
                  }`}
              >
                <span className="font-medium">{page.name}</span>
              </button>
            ))}
          </div>
        </nav>
 
        <main className="flex-1 h-72 max-h-[45vh] overflow-y-auto content-scrollbar bg-white text-black rounded-lg p-2 md:p-2">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
 
export default Content;
 
 