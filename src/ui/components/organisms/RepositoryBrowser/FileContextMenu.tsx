import path from "path"
import React from "react"
import { ContextMenu, Item, Separator } from "react-contexify"
import { connect } from "react-redux"
import * as EditorActions from "../../../actionCreators/editorActions"
import { RootState } from "../../../reducers"

type OwnProps = {
  root: string
}

type Props = OwnProps & {
  addToStage: typeof EditorActions.addToStage
  deleteFile: typeof EditorActions.deleteFile
}

const actions = {
  addToStage: EditorActions.addToStage,
  deleteFile: EditorActions.deleteFile
}

export const FileContextMenu: any = connect(
  (_state: RootState, ownProps: OwnProps) => {
    return ownProps
  },
  actions
)(function FileContextMenuImpl(props: Props) {
  return (
    <ContextMenu id="file">
      <Item
        onClick={({ dataFromProvider }: any) => {
          const relpath = path.relative(props.root, dataFromProvider.filepath)
          props.addToStage({ projectRoot: props.root, relpath })
        }}
      >
        Add to stage
      </Item>
      <Separator />
      <Item
        onClick={({ dataFromProvider }: any) => {
          props.deleteFile({ filename: dataFromProvider.filepath })
        }}
      >
        Delete
      </Item>
    </ContextMenu>
  )
})
