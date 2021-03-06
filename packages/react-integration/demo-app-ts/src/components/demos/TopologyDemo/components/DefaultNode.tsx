import * as React from 'react';
import { observer } from 'mobx-react';
import {
  WithCreateConnectorProps,
  Node,
  WithDragNodeProps,
  WithSelectionProps,
  WithDndDragProps,
  WithDndDropProps,
  useCombineRefs,
  useAnchor,
  EllipseAnchor
} from '@patternfly/react-topology';

type NodeProps = {
  element: Node;
  droppable?: boolean;
  hover?: boolean;
  canDrop?: boolean;
} & WithSelectionProps &
  WithDragNodeProps &
  WithDndDragProps &
  WithDndDropProps &
  WithCreateConnectorProps;

const DefaultNode: React.FC<NodeProps> = ({
  element,
  selected,
  onSelect,
  dragNodeRef,
  dndDragRef,
  droppable,
  hover,
  canDrop,
  dndDropRef,
  onHideCreateConnector,
  onShowCreateConnector
}) => {
  useAnchor(EllipseAnchor);
  const refs = useCombineRefs<SVGEllipseElement>(dragNodeRef, dndDragRef, dndDropRef);
  const { width, height } = element.getDimensions();

  return (
    <ellipse
      onMouseEnter={onShowCreateConnector}
      onMouseLeave={onHideCreateConnector}
      ref={refs}
      onClick={onSelect}
      cx={width / 2}
      cy={height / 2}
      rx={Math.max(0, width / 2 - 1)}
      ry={Math.max(0, height / 2 - 1)}
      fill={canDrop && hover ? 'lightgreen' : canDrop && droppable ? 'lightblue' : selected ? 'blue' : 'grey'}
      strokeWidth={1}
      stroke="#333333"
    />
  );
};

export default observer(DefaultNode);
