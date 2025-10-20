import React from "react";
import { Badge } from "../ui/badge";

const PostTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {tags.map((tag) => (
        <Badge variant="outline" key={tag.title} className="hover:scale-110 duration-200 cursor-pointer">
          {tag.title}#
        </Badge>
      ))}
    </div>
  );
};

export default PostTags;
