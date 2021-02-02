import React, { useEffect, useRef, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import classnames from "classnames"

import "./roadmap.scss"

import RoadmapItem from "./RoadmapItem"
import ViewportObserver from "@components/ViewportObserver"
import { parseMilestones } from "@utils/dataParser"
import { useLocale } from "@utils/localizedPage"

const Roadmap = () => {
  const data = useStaticQuery(graphql`
    query {
      milestones: allDirectusMilestone {
        nodes {
          completion
          localized_contents {
            description
            title
            subtitle
            locale
          }
          image {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  `)
  const [locale] = useLocale()
  const titleRef = useRef()
  const listRef = useRef()
  const milestones = parseMilestones(data.milestones.nodes, locale)
  const [selectedMilestone, setSelectedMilestone] = useState()
  const [hidingMilestone, setHidingMilestone] = useState(false)

  useEffect(() => {
    if (selectedMilestone !== undefined) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedMilestone])

  const toggleShowMilestone = i => {
    if (selectedMilestone === i) {
      setHidingMilestone(true)
      setTimeout(() => {
        setSelectedMilestone(undefined)
        setHidingMilestone(false)
      }, 500)
    } else {
      setSelectedMilestone(i)
    }
  }

  return (
    <section className="roadmap">
      <div className="container">
        <div className="row">
          <div className="col">
            <ViewportObserver childrenRef={titleRef} viewportClassName="animation-active">
              <h2 className="roadmap-title fade-in-up delay-50" ref={titleRef}>
                Roadmap
              </h2>
            </ViewportObserver>

            <ViewportObserver childrenRef={listRef} viewportClassName="animation-active">
              <ul className="roadmap-list fade-in-up delay-200" ref={listRef}>
                {milestones.map((milestone, i) => (
                  <RoadmapItem
                    milestone={milestone}
                    className={classnames({
                      disabled: selectedMilestone !== undefined
                    })}
                    onClick={() => toggleShowMilestone(i)}
                    key={i}
                  />
                ))}
              </ul>
            </ViewportObserver>


            {selectedMilestone !== undefined && (
              <div
                className={classnames("roadmap-backdrop", {
                  show: selectedMilestone !== undefined,
                  hide: hidingMilestone
                })}
                onClick={() => toggleShowMilestone(selectedMilestone)}
                onKeyDown={() => {}}
                role="button"
                aria-label="Hide Modal"
                tabIndex={0}
              >
                <RoadmapItem
                  milestone={milestones[selectedMilestone]}
                  className={classnames("show", {
                    hiding: hidingMilestone,
                  })}
                  style={{
                    top: "5rem",
                    left: "50%",
                    transform: "translateX(-50%)"
                  }}
                  showClose={true}
                  onClose={() => toggleShowMilestone(selectedMilestone)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap
