import React from "react";
import { useFormik } from "formik";

function Journal() {
  const formik = useFormik({
    initialValues: {
      Title: "",
      Entry: "",
      Tags: "",
      Mood: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.Title) {
        errors.Title = "Title is required";
      }

      if (!values.Entry) {
        errors.Entry = "Entry is required";
      }

      if (!values.Tags) {
        errors.Tags = "Tag is required";
      }

      if (!values.Mood) {
        errors.Mood = "Mood is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('/journal_entries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.Title,
            content: values.Entry,
            Tags: values.Tags,
            Mood: values.Mood,
            user_id: 1,
          }),
        });

        if (response.ok) {
          formik.resetForm();
          formik.setStatus("Entry Submitted!");
        } else {
          console.error('Submission failed');
        }
      } catch (error) {
        console.error('Error during submission:', error);
      }
    },
  });

  return (
    <div className="journal">
      <h2>Journal Entry</h2>
      <form onSubmit={formik.handleSubmit}>
        <label>
          <input type="text" name="Title" placeholder="Title" onChange={formik.handleChange} value={formik.values.Title} />
          {formik.errors.Title && <div>{formik.errors.Title}</div>}
        </label>
        <label>
          <input type="text" name="Entry" placeholder="Entry" onChange={formik.handleChange} value={formik.values.Entry} />
          {formik.errors.Entry && <div>{formik.errors.Entry}</div>}
        </label>
        <label>
          Tags:
          <select name="Tags" onChange={formik.handleChange} value={formik.values.Tags}>
            <option value="">Select Tag</option>
            <option value="Family">Family</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Adventure">Adventure</option>
            <option value="Fun">Fun</option>
          </select>
          {formik.errors.Tags && <div>{formik.errors.Tags}</div>}
        </label>
        <label>
          Mood:
          <select name="Mood" onChange={formik.handleChange} value={formik.values.Mood}>
            <option value="">Select Mood</option>
            <option value="Happy">Happy</option>
            <option value="Joyful">Joyful</option>
            <option value="Proud">Proud</option>
            <option value="Content">Content</option>
            <option value="Bittersweet">Bittersweet</option>
          </select>
          {formik.errors.Mood && <div>{formik.errors.Mood}</div>}
        </label>
        <button type="submit">Submit</button>
      </form>
      {formik.status && <p>{formik.status}</p>}
    </div>
  );
}

export default Journal;
