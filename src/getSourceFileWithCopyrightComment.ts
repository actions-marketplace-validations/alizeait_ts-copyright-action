/*
  Copyright (c) 2023 Ali Zeaiter.
  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree. 
*/

import ts from "typescript";

export function getSourceFileWithCopyrightComment(
  sourceFileContent: string,
  text: string
) {
  if (!text.toLowerCase().includes("copyright")) {
    throw new Error(
      '"Copyright" keyword must be part of the copyright comment'
    );
  }

  const node = ts.createSourceFile(
    "X",
    sourceFileContent,
    ts.ScriptTarget.Latest
  );

  const copyrightCommentRange = getMultiLineCommentRange({
    node,
    includes: "copyright",
  });

  // Remove current copyright if it already exists
  removeCopyrightCommentFromSourceFile(node, copyrightCommentRange);

  node.text =
    `/*\n  ${text.replace(/[\\]*\\n|\n/g, "\n  ")} \n*/${
      node.text.startsWith("\n") ? "" : "\n\n"
    }` + node.text;

  return node.text;
}

function getMultiLineCommentRange({
  node,
  includes,
}: {
  node: ts.Node;
  includes?: string;
}) {
  const commentRanges = ts.getLeadingCommentRanges(
    node.getFullText(),
    node.getFullStart()
  );
  if (!commentRanges) {
    return;
  }
  return commentRanges
    .filter(
      (commentRange) =>
        commentRange.kind === ts.SyntaxKind.MultiLineCommentTrivia
    )
    .find((commentRange) => {
      if (includes) {
        return node
          .getFullText()
          .slice(commentRange.pos, commentRange.end)
          .toLowerCase()
          .includes(includes);
      }
      // Always return first commentRange if includes is not set
      return true;
    });
}

function removeCopyrightCommentFromSourceFile(
  node: ts.SourceFile,
  copyrightComment?: ts.CommentRange
) {
  if (!copyrightComment) {
    return;
  }
  node.text =
    node.text.slice(0, copyrightComment.pos) +
    node.text.slice(copyrightComment.end);
}
