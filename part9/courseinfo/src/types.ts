interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface Description {
  description:string;
}

interface CourseNormalPart extends CoursePartBase, Description {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase, Description {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseRequirementsPart extends CoursePartBase, Description {
  requirements:Array<string>,
  type: "special"
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementsPart;
