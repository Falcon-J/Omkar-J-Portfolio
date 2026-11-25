"use client";
import { useReducer } from "react";
import { Send, FileText, Info, RotateCcw } from "lucide-react";
import { Companion } from "./companion";
import {
  initialSimulation,
  simulationReducer,
} from "@/lib/duplicate-simulation";
export function Workshop() {
  const [state, dispatch] = useReducer(simulationReducer, initialSimulation);
  return (
    <div className="workshop-body">
      <section className="simulation-panel">
        <h2>A request arrives twice.</h2>
        <div className="simulation-desk">
          <div className="simulation-actions">
            <button
              className="button lavender"
              onClick={() => dispatch({ type: "send" })}
            >
              <Send size={20} />
              {state.received ? "Send again" : "Send request"}
            </button>
            <label className="protection-toggle">
              <input
                type="checkbox"
                checked={state.protection}
                onChange={(event) =>
                  dispatch({
                    type: "protection",
                    enabled: event.target.checked,
                  })
                }
              />
              <span aria-hidden="true" />
              Duplicate protection
            </label>
          </div>
          <div className="request-receipts" aria-hidden="true">
            {[0, 1].map((index) => (
              <div
                key={index}
                className={state.received > index ? "received" : ""}
              >
                <FileText size={45} />
                <span>
                  {state.received > index
                    ? "Request received"
                    : "Waiting for request"}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="simulation-result" role="status" aria-live="polite">
          <strong>
            {state.received} received · {state.applied} applied
          </strong>
          <p>
            {!state.received
              ? "Send the same request twice. Changing protection starts a fresh run."
              : state.protection && state.received > 1
                ? "The repeated request was recognized. The operation was applied once."
                : state.applied > 1
                  ? "Both requests were applied. Turn on protection to start a new run."
                  : "The first request was applied. Send it again to see what changes."}
          </p>
        </div>
        <div className="simulation-foot">
          <p>
            <Info size={15} />
            Illustrative simulation · no API calls or payments.
          </p>
          <button
            className="text-button"
            onClick={() => dispatch({ type: "reset" })}
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>
      </section>
      <Companion
        className="workshop-guide"
        rest="workshop"
        arrival={false}
        selection={state.received}
      />
    </div>
  );
}
