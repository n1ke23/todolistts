import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps{
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, title: string) => void;
    onRemoved: (id: string) => void;
}
    
export const InputTask: React.FC<InputTaskProps> = ({
    id,
    title,
    onDone,
    onEdited,
    onRemoved
}) => {

    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editValue, setEditValue] = useState(title)
    const editTitleInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);
    
    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    className={styles.inputTaskCheckbox}
                    type="checkbox"
                    disabled={isEditMode}
                    checked={checked}
                    onChange={(event) => {
                        setChecked(event.target.checked)
                        if (event.target.checked) {
                            setTimeout(() => {
                                onDone(id);
                            }, 300);
                        }
                    }}
                />
                { isEditMode ? (
                    <input
                        className={styles.inputTaskEditTitle}
                        ref={editTitleInputRef}
                        value={editValue}
                        onChange={(event) => {
                            setEditValue(event.target.value);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                onEdited(id, editValue);
                                setIsEditMode(false);
                            }
                        }}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>
            {isEditMode ? (
                <button
                    aria-label="Save"
                    className={styles.inputTaskSave}
                    onClick={(event) => {
                        onEdited(id, editValue);
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <button
                    aria-label="Edit"
                    className={styles.inputTaskEdit}
                    onClick={(event) => {
                        setIsEditMode(true);
                    }}
                />
            )}
            <button
                aria-label="Remove"
                className={styles.inputTaskRemove}
                onClick={(event) => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    );
};