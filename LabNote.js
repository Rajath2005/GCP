const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, LevelFormat, BorderStyle, WidthType,
  ShadingType, PageBreak, VerticalAlign
} = require('docx');
const fs = require('fs');

const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text, bold: true, size: 32, font: "Arial", color: "1F4E79" })],
    spacing: { before: 360, after: 120 }
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    children: [new TextRun({ text, bold: true, size: 26, font: "Arial", color: "2E75B6" })],
    spacing: { before: 240, after: 80 }
  });
}

function heading3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, font: "Arial", color: "2F5496" })],
    spacing: { before: 180, after: 60 }
  });
}

function body(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 20, font: "Arial" })],
    spacing: { before: 60, after: 60 }
  });
}

function code(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, font: "Courier New", color: "C0392B" })],
    shading: { fill: "F4F4F4", type: ShadingType.CLEAR },
    spacing: { before: 40, after: 40 },
    indent: { left: 360 }
  });
}

function numberedItem(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [new TextRun({ text, size: 20, font: "Arial" })],
    spacing: { before: 60, after: 60 }
  });
}

function bulletItem(text, ref) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [new TextRun({ text, size: 20, font: "Arial" })],
    spacing: { before: 40, after: 40 }
  });
}

function noteBox(text) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders,
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: "FFF3CD", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 160, right: 160 },
            children: [new Paragraph({ children: [new TextRun({ text: "📝 NOTE: " + text, size: 18, font: "Arial", italics: true })] })]
          })
        ]
      })
    ]
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function titleRow(expNum, title) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [9360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: { top: border, bottom: border, left: border, right: border },
            width: { size: 9360, type: WidthType.DXA },
            shading: { fill: "1F4E79", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 200, right: 200 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: `Experiment ${expNum}: ${title}`, bold: true, size: 28, font: "Arial", color: "FFFFFF" })]
              })
            ]
          })
        ]
      })
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "steps",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps2",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps3",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps4",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps5",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps6",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps7",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps8",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps9",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "steps10",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets2",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets3",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets4",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets5",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets6",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets7",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets8",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets9",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
      {
        reference: "bullets10",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
      },
    ]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 20 } } }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    children: [
      // COVER PAGE
      new Paragraph({ spacing: { before: 2880 } }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "CLOUD COMPUTING LAB", bold: true, size: 48, font: "Arial", color: "1F4E79" })],
        spacing: { after: 120 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Exam Preparation Notes", bold: true, size: 32, font: "Arial", color: "2E75B6" })],
        spacing: { after: 120 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "BCT - Department of Computer Science", size: 24, font: "Arial", color: "555555" })],
        spacing: { after: 60 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "Google Cloud Skill Boost Labs", size: 22, font: "Arial", color: "888888" })],
        spacing: { after: 60 }
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "May 2026", size: 22, font: "Arial", color: "888888" })]
      }),
      new Paragraph({ spacing: { before: 480 } }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [9360],
        rows: [new TableRow({
          children: [new TableCell({
            borders,
            shading: { fill: "EBF3FB", type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 200, right: 200 },
            width: { size: 9360, type: WidthType.DXA },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Experiments Covered", bold: true, size: 22, font: "Arial", color: "1F4E79" })], spacing: { after: 80 } }),
              new Paragraph({ children: [new TextRun({ text: "E1 & E2: Create a Virtual Machine (Console + gcloud)", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E3: Cloud Run Functions - Qwik Start", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E4: App Engine - Qwik Start (Python + Flask)", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E5: Cloud Storage - Qwik Start (CLI + Console)", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E6: Cloud SQL for MySQL - Qwik Start", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E7: Pub/Sub - Qwik Start (Console)", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E8: VPC Networking Fundamentals + VPC Peering", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E9: Cloud Monitoring - Qwik Start", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
              new Paragraph({ children: [new TextRun({ text: "E10: GKE Pipeline using Cloud Build", size: 20, font: "Arial" })], spacing: { before: 40, after: 40 } }),
            ]
          })]
        })]
      }),
      pageBreak(),

      // ── EXPERIMENT 1 & 2 ──────────────────────────────────────────────
      titleRow("1 & 2", "Create a Virtual Machine"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create virtual machines using Google Cloud Console (GUI) and gcloud CLI, and deploy an NGINX web server."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Part A – Create VM via Cloud Console (GUI)"),
      heading3("Step 1: Open Compute Engine"),
      numberedItem("Go to Navigation Menu > Compute Engine > VM Instances.", "steps"),
      numberedItem("Click Create Instance.", "steps"),

      heading3("Step 2: Configure the VM"),
      numberedItem("Name: gcelab", "steps2"),
      numberedItem("Region & Zone: Select the region/zone assigned in your lab.", "steps2"),
      numberedItem("Series: E2  |  Machine Type: e2-medium (2 vCPU, 4 GB RAM)", "steps2"),
      numberedItem("Boot Disk: Debian GNU/Linux (default) — click Change if you need to pick OS.", "steps2"),
      numberedItem("Firewall: Check Allow HTTP traffic.", "steps2"),
      numberedItem("Click Create and wait for the green checkmark.", "steps2"),

      heading2("Part B – Install NGINX Web Server on the VM"),
      heading3("Step 1: SSH into the VM"),
      numberedItem("In the VM Instances list, click SSH next to gcelab.", "steps3"),
      heading3("Step 2: Install NGINX"),
      code("sudo apt-get update"),
      code("sudo apt-get install -y nginx"),
      numberedItem("Check the server is running:", "steps3"),
      code("ps auwx | grep nginx"),
      numberedItem("Copy the VM's External IP and open it in a browser — you should see the NGINX welcome page.", "steps3"),

      heading2("Part C – Create VM via gcloud CLI (Cloud Shell)"),
      heading3("Step 1: Activate Cloud Shell"),
      numberedItem("Click the Cloud Shell icon (>_) at top right of the console.", "steps4"),
      heading3("Step 2: Set region and zone"),
      code("gcloud config set compute/region REGION"),
      code("export REGION=REGION"),
      code("export ZONE=ZONE"),
      heading3("Step 3: Create VM with gcloud"),
      code("gcloud compute instances create gcelab2 --machine-type e2-medium --zone=$ZONE"),
      heading3("Step 4: SSH via gcloud"),
      code("gcloud compute ssh gcelab2 --zone=$ZONE"),
      heading3("Key Commands Summary"),
      code("gcloud auth list                          # List active account"),
      code("gcloud config list project               # Show project ID"),
      code("gcloud compute instances list            # List all VMs"),
      noteBox("Replace REGION and ZONE with the values provided in your lab (e.g., us-east1, us-east1-b)."),
      pageBreak(),

      // ── EXPERIMENT 3 ──────────────────────────────────────────────────
      titleRow("3", "Cloud Run Functions: Qwik Start"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create Cloud Run Functions that respond to HTTP calls, Cloud Storage events, and Cloud Audit Logs, and explore advanced settings like revisions, minimum instances, and concurrency."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Task 1 – Enable the Required APIs"),
      numberedItem("Go to Navigation Menu > APIs & Services > Enable APIs.", "steps5"),
      numberedItem("Search for and enable: Cloud Run API, Cloud Functions API, Cloud Build API, Artifact Registry API, Eventarc API.", "steps5"),

      heading2("Task 2 – Create an HTTP Function"),
      heading3("In Cloud Shell:"),
      code("mkdir ~/hello-http && cd ~/hello-http"),
      code("cat > main.py << 'EOF'\nimport functions_framework\n\n@functions_framework.http\ndef hello_http(request):\n    return 'Hello World!'\nEOF"),
      code("cat > requirements.txt << 'EOF'\nfunctions-framework==3.*\nEOF"),
      code("gcloud functions deploy hello-http \\\n  --gen2 \\\n  --runtime=python311 \\\n  --region=REGION \\\n  --source=. \\\n  --entry-point=hello_http \\\n  --trigger-http \\\n  --allow-unauthenticated"),
      numberedItem("Test the function:", "steps5"),
      code("gcloud functions call hello-http --region=REGION --gen2"),

      heading2("Task 3 – Create a Cloud Storage Function"),
      numberedItem("Create a Cloud Storage bucket:", "steps6"),
      code("gsutil mb -l REGION gs://YOUR_PROJECT_ID-bucket"),
      numberedItem("Write function code:", "steps6"),
      code("mkdir ~/hello-gcs && cd ~/hello-gcs"),
      code("cat > main.py << 'EOF'\nfrom cloudevents.http import CloudEvent\nimport functions_framework\n\n@functions_framework.cloud_event\ndef hello_gcs(cloud_event: CloudEvent):\n    data = cloud_event.data\n    print(f\"File: {data['name']} in bucket: {data['bucket']}\")\nEOF"),
      numberedItem("Deploy the function with a Cloud Storage trigger:", "steps6"),
      code("gcloud functions deploy hello-gcs \\\n  --gen2 \\\n  --runtime=python311 \\\n  --region=REGION \\\n  --source=. \\\n  --entry-point=hello_gcs \\\n  --trigger-event-filters=\"type=google.cloud.storage.object.v1.finalized\" \\\n  --trigger-event-filters=\"bucket=YOUR_BUCKET\""),

      heading2("Task 4 – Deploy Multiple Revisions"),
      numberedItem("Redeploy the HTTP function with an environment variable to create a new revision:", "steps7"),
      code("gcloud functions deploy hello-http \\\n  --gen2 --runtime=python311 \\\n  --region=REGION \\\n  --source=. \\\n  --entry-point=hello_http \\\n  --trigger-http \\\n  --allow-unauthenticated \\\n  --set-env-vars VERSION=v2"),
      numberedItem("Go to Console > Cloud Run > hello-http > Revisions tab to see traffic split options.", "steps7"),

      heading2("Task 5 – Set Minimum Instances"),
      code("gcloud run services update hello-http \\\n  --min-instances=1 \\\n  --region=REGION"),

      heading2("Task 6 – Set Concurrency"),
      code("gcloud run services update hello-http \\\n  --concurrency=50 \\\n  --region=REGION"),
      noteBox("Cloud Run Functions (Gen2) are powered by Cloud Run, supporting up to 1000 concurrent requests, 60-min HTTP timeout, and up to 16GB RAM."),
      pageBreak(),

      // ── EXPERIMENT 4 ──────────────────────────────────────────────────
      titleRow("4", "App Engine: Qwik Start – Python & Flask"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To deploy a Python web application to Google App Engine using standard and flexible environments."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Part A – App Engine: Python (Standard) – E4_a"),
      heading3("Task 1: Enable App Engine Admin API"),
      numberedItem("Go to Navigation Menu > APIs & Services > Library.", "steps8"),
      numberedItem("Search for App Engine Admin API and click Enable.", "steps8"),

      heading3("Task 2: Download the Hello World App"),
      numberedItem("In Cloud Shell:", "steps8"),
      code("git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git"),
      code("cd python-docs-samples/appengine/standard_python3/hello_world"),

      heading3("Task 3: Test the Application Locally"),
      code("dev_appserver.py app.yaml"),
      numberedItem("Click Web Preview > Preview on port 8080 to see the app.", "steps8"),

      heading3("Task 4: Make a Change (Optional)"),
      code("nano main.py"),
      numberedItem("Change the return message, save, and refresh the preview.", "steps8"),

      heading3("Task 5: Deploy the App"),
      code("gcloud app deploy"),
      numberedItem("When prompted to choose a region, select the appropriate one and confirm with Y.", "steps8"),

      heading3("Task 6: View the Application"),
      code("gcloud app browse"),
      numberedItem("Or go to Navigation Menu > App Engine > Dashboard and click the URL shown.", "steps8"),

      heading2("Part B – Flask App on App Engine Flexible – E4_b"),
      heading3("Task 1: Clone the sample app"),
      code("git clone https://github.com/GoogleCloudPlatform/python-docs-samples.git"),
      code("cd python-docs-samples/appengine/flexible/hello_world"),

      heading3("Task 2: Review the app.yaml (Flexible config)"),
      code("cat app.yaml"),
      body("The app.yaml for flexible environment looks like:"),
      code("runtime: python\nenv: flex\nentrypoint: gunicorn -b :$PORT main:app\n\nruntime_config:\n  python_version: 3"),

      heading3("Task 3: Deploy"),
      code("gcloud app deploy"),
      noteBox("App Engine Standard is for Python/Java/Go/Node apps with fast scaling. Flexible supports custom runtimes via Docker containers."),
      pageBreak(),

      // ── EXPERIMENT 5 ──────────────────────────────────────────────────
      titleRow("5", "Cloud Storage: Qwik Start – CLI/SDK & Console"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create Cloud Storage buckets, upload/download objects, manage folders, and control access using gsutil CLI and the Google Cloud Console."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Part A – Using CLI/SDK (gsutil) – E5_a"),
      heading3("Task 1: Create a Bucket"),
      code("gsutil mb gs://YOUR_BUCKET_NAME"),
      body("Rules for bucket names: globally unique, lowercase, no spaces, 3–63 chars."),

      heading3("Task 2: Upload an Object to the Bucket"),
      code("gsutil cp ada.jpg gs://YOUR_BUCKET_NAME"),
      body("Download a sample image first if needed:"),
      code("curl https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/320px-A_small_cup_of_coffee.JPG \\\n  --output ada.jpg"),

      heading3("Task 3: Download an Object from the Bucket"),
      code("gsutil cp gs://YOUR_BUCKET_NAME/ada.jpg ada2.jpg"),

      heading3("Task 4: Copy Object to a Folder in the Bucket"),
      code("gsutil cp gs://YOUR_BUCKET_NAME/ada.jpg gs://YOUR_BUCKET_NAME/image-folder/"),

      heading3("Task 5: List Contents of the Bucket"),
      code("gsutil ls gs://YOUR_BUCKET_NAME"),
      code("gsutil ls gs://YOUR_BUCKET_NAME/image-folder/"),

      heading3("Task 6: List Details for an Object"),
      code("gsutil ls -l gs://YOUR_BUCKET_NAME/ada.jpg"),

      heading3("Task 7: Make Object Publicly Accessible"),
      code("gsutil acl ch -u AllUsers:R gs://YOUR_BUCKET_NAME/ada.jpg"),
      body("Verify by opening: https://storage.googleapis.com/YOUR_BUCKET_NAME/ada.jpg"),

      heading3("Task 8: Remove Public Access"),
      code("gsutil acl ch -d AllUsers gs://YOUR_BUCKET_NAME/ada.jpg"),

      heading2("Part B – Using Google Cloud Console – E5_b"),
      numberedItem("Go to Navigation Menu > Cloud Storage > Buckets.", "steps9"),
      numberedItem("Click Create Bucket, enter a unique name, choose region, and click Create.", "steps9"),
      numberedItem("To upload: click Upload Files inside the bucket.", "steps9"),
      numberedItem("To make public: click the object > Permissions tab > Add entry: allUsers, Storage Object Viewer.", "steps9"),
      numberedItem("To create a folder: click Create Folder, enter name, click Create.", "steps9"),
      noteBox("gsutil is the CLI tool for Cloud Storage. 'gs://' is the URI prefix for GCS buckets."),
      pageBreak(),

      // ── EXPERIMENT 6 ──────────────────────────────────────────────────
      titleRow("6", "Cloud SQL for MySQL: Qwik Start"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create a Cloud SQL MySQL instance, connect to it via Cloud Shell, and perform basic SQL operations."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Task 1 – Create a Cloud SQL Instance"),
      numberedItem("Go to Navigation Menu > SQL.", "steps10"),
      numberedItem("Click Create Instance.", "steps10"),
      numberedItem("Choose MySQL as the database engine.", "steps10"),
      numberedItem("Select Enterprise edition, Preset: Development.", "steps10"),
      numberedItem("Database version: MySQL 8.", "steps10"),
      numberedItem("Instance ID: myinstance.", "steps10"),
      numberedItem("Click Generate next to the Password field. Note down the password.", "steps10"),
      numberedItem("Select a Region (same region as your project), leave zone as Any.", "steps10"),
      numberedItem("Click Create Instance — this takes 2–5 minutes.", "steps10"),

      heading2("Task 2 – Connect Using mysql Client in Cloud Shell"),
      numberedItem("Once the instance is ready, click on it to open its details.", "steps10"),
      numberedItem("In Cloud Shell, run:", "steps10"),
      code("gcloud sql connect myinstance --user=root --quiet"),
      numberedItem("Enter the password when prompted. You should see the mysql> prompt.", "steps10"),

      heading2("Task 3 – Create a Database and Upload Data"),
      heading3("Inside the MySQL prompt:"),
      code("CREATE DATABASE guestbook;"),
      code("USE guestbook;"),
      code("CREATE TABLE entries (\n  guestName VARCHAR(255),\n  content   VARCHAR(255),\n  entryID   INT NOT NULL AUTO_INCREMENT,\n  PRIMARY KEY(entryID)\n);"),
      code("INSERT INTO entries (guestName, content) VALUES\n  ('first guest', 'I got here!'),\n  ('second guest', 'Me too!');"),
      code("SELECT * FROM entries;"),
      code("exit"),
      noteBox("Cloud SQL is a fully managed relational database service. It supports MySQL, PostgreSQL, and SQL Server."),
      pageBreak(),

      // ── EXPERIMENT 7 ──────────────────────────────────────────────────
      titleRow("7", "Pub/Sub: Qwik Start – Console"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To set up a Pub/Sub topic and subscription, publish messages, and view them using the Google Cloud Console."),
      new Paragraph({ spacing: { before: 80 } }),
      body("Pub/Sub is a messaging service for asynchronous communication between applications. A publisher sends messages to a topic; subscribers receive them via pull or push."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Task 1 – Set Up Pub/Sub (Create a Topic)"),
      numberedItem("Go to Navigation Menu > Pub/Sub > Topics.", "steps10"),
      numberedItem("Click Create Topic.", "steps10"),
      numberedItem("Topic ID: MyTopic", "steps10"),
      numberedItem("Click Create.", "steps10"),

      heading2("Task 2 – Add a Subscription"),
      numberedItem("Click on the topic MyTopic.", "steps10"),
      numberedItem("Click Create Subscription.", "steps10"),
      numberedItem("Subscription ID: MySub", "steps10"),
      numberedItem("Delivery type: Pull", "steps10"),
      numberedItem("Click Create.", "steps10"),

      heading2("Task 3 – Publish a Message to the Topic"),
      numberedItem("In the Topic details page, click Publish Message.", "steps10"),
      numberedItem("In the Message body field, type: Hello World", "steps10"),
      numberedItem("Click Publish.", "steps10"),

      heading2("Task 4 – View the Message (Pull from Subscription)"),
      numberedItem("Go to Navigation Menu > Pub/Sub > Subscriptions.", "steps10"),
      numberedItem("Click on MySub.", "steps10"),
      numberedItem("Click Pull messages (or use the Messages tab).", "steps10"),
      numberedItem("Enable ACK on the message to acknowledge it.", "steps10"),
      heading3("Alternatively, via Cloud Shell:"),
      code("gcloud pubsub subscriptions pull --auto-ack MySub"),
      noteBox("Each message must be acknowledged within the ackDeadlineSeconds window, otherwise it is re-delivered."),
      pageBreak(),

      // ── EXPERIMENT 8 ──────────────────────────────────────────────────
      titleRow("8", "VPC Networking Fundamentals + VPC Network Peering"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create a VPC network with firewall rules, deploy VMs in different zones, test connectivity, and set up VPC Network Peering between two VPC networks."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Part A – VPC Networking Fundamentals (E8_a)"),
      heading3("Task 1: Explore the Default Network"),
      numberedItem("Go to Navigation Menu > VPC network > VPC networks.", "steps10"),
      numberedItem("Observe the default network with its subnets in each region.", "steps10"),
      numberedItem("Go to Firewall — note the default rules (allow-internal, allow-ssh, allow-rdp, allow-icmp).", "steps10"),

      heading3("Task 2: Create a VPC Network and VM Instances"),
      numberedItem("Go to VPC networks > Create VPC Network.", "steps10"),
      numberedItem("Name: mynetwork  |  Subnet mode: Automatic", "steps10"),
      numberedItem("Under Firewall rules, check all 4 rules, then click Create.", "steps10"),
      numberedItem("Create VM 1 in the primary region:", "steps10"),
      code("gcloud compute instances create mynet-us-vm \\\n  --zone=us-central1-f \\\n  --machine-type=e2-micro \\\n  --network=mynetwork"),
      numberedItem("Create VM 2 in another region:", "steps10"),
      code("gcloud compute instances create mynet-eu-vm \\\n  --zone=europe-west1-c \\\n  --machine-type=e2-micro \\\n  --network=mynetwork"),

      heading3("Task 3: Test Connectivity"),
      numberedItem("SSH into mynet-us-vm.", "steps10"),
      numberedItem("Ping the internal IP of mynet-eu-vm:", "steps10"),
      code("ping -c 3 <INTERNAL_IP_OF_EU_VM>"),
      numberedItem("Also ping the external IP:", "steps10"),
      code("ping -c 3 <EXTERNAL_IP_OF_EU_VM>"),

      heading3("Tasks 4–6: Remove Firewall Rules and Test"),
      numberedItem("Remove allow-icmp rule: Firewall > allow-icmp > Delete. Try ping again — it fails.", "steps10"),
      numberedItem("Remove allow-custom rule: Internal ping now fails.", "steps10"),
      numberedItem("Remove allow-ssh: SSH is no longer possible.", "steps10"),

      heading2("Part B – VPC Network Peering (E8_b)"),
      body("VPC Network Peering allows private connectivity across two VPC networks even in different projects/organizations."),
      numberedItem("Create two VPC networks: network-a and network-b (can be in separate projects).", "steps10"),
      numberedItem("Create VMs in each network.", "steps10"),
      numberedItem("Create peering from network-a to network-b:", "steps10"),
      code("gcloud compute networks peerings create peer-ab \\\n  --network=network-a \\\n  --peer-network=network-b \\\n  --auto-create-routes"),
      numberedItem("Create the reverse peering from network-b to network-a:", "steps10"),
      code("gcloud compute networks peerings create peer-ba \\\n  --network=network-b \\\n  --peer-network=network-a \\\n  --auto-create-routes"),
      numberedItem("Verify peering status: Navigation Menu > VPC Network > VPC network peering.", "steps10"),
      numberedItem("SSH into the VM in network-a and ping the internal IP of VM in network-b.", "steps10"),
      noteBox("VPC Peering is non-transitive — if A is peered with B and B with C, A cannot reach C through B."),
      pageBreak(),

      // ── EXPERIMENT 9 ──────────────────────────────────────────────────
      titleRow("9", "Cloud Monitoring: Qwik Start"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To monitor a Compute Engine VM instance using Cloud Monitoring — install agents, create uptime checks, alerting policies, and dashboards."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Task 1 – Create a Compute Engine Instance"),
      numberedItem("Go to Navigation Menu > Compute Engine > VM Instances > Create Instance.", "steps10"),
      numberedItem("Name: lamp-1-vm  |  Region: us-central1  |  Zone: us-central1-a", "steps10"),
      numberedItem("Series: E2  |  Machine Type: e2-medium", "steps10"),
      numberedItem("Firewall: Allow HTTP traffic. Click Create.", "steps10"),

      heading2("Task 2 – Install Apache2 HTTP Server"),
      numberedItem("SSH into lamp-1-vm.", "steps10"),
      code("sudo apt-get update"),
      code("sudo apt-get install -y apache2 php"),
      code("sudo service apache2 start"),
      numberedItem("Verify by opening the external IP in a browser — you should see the Apache default page.", "steps10"),
      numberedItem("Install the Ops Agent (monitoring + logging):", "steps10"),
      code("curl -sSO https://dl.google.com/cloudagents/add-google-cloud-ops-agent-repo.sh"),
      code("sudo bash add-google-cloud-ops-agent-repo.sh --also-install"),

      heading2("Task 3 – Create an Uptime Check"),
      numberedItem("Go to Navigation Menu > Monitoring > Uptime checks.", "steps10"),
      numberedItem("Click Create Uptime Check.", "steps10"),
      numberedItem("Title: Lamp Uptime Check | Protocol: HTTP | Resource type: Instance | Instance: lamp-1-vm", "steps10"),
      numberedItem("Check frequency: 1 minute. Click Continue > Create.", "steps10"),

      heading2("Task 4 – Create an Alerting Policy"),
      numberedItem("Go to Monitoring > Alerting > Create Policy.", "steps10"),
      numberedItem("Click Select a metric > VM Instance > CPU utilization.", "steps10"),
      numberedItem("Set threshold: above 0.5 for 1 minute.", "steps10"),
      numberedItem("Add notification channel (email). Name the policy and click Save.", "steps10"),

      heading2("Task 5 – Create a Dashboard and Chart"),
      numberedItem("Go to Monitoring > Dashboards > Create Dashboard.", "steps10"),
      numberedItem("Name it: Cloud Monitoring LAMP Qwik Start Dashboard.", "steps10"),
      numberedItem("Click Add Chart > Line > select CPU utilization metric for lamp-1-vm. Save.", "steps10"),

      heading2("Task 6 – View Logs"),
      numberedItem("Go to Monitoring > Logging > Logs Explorer.", "steps10"),
      numberedItem("In the query box select: VM Instance > lamp-1-vm. Click Run Query.", "steps10"),
      noteBox("The Ops Agent replaces the older Stackdriver Monitoring agent. It collects system metrics AND logs."),
      pageBreak(),

      // ── EXPERIMENT 10 ──────────────────────────────────────────────────
      titleRow("10", "GKE Pipeline using Cloud Build (CI/CD)"),
      new Paragraph({ spacing: { before: 160 } }),
      body("AIM: To create a CI/CD pipeline that builds Docker images with Cloud Build, stores them in Artifact Registry, and deploys to Google Kubernetes Engine (GKE) automatically."),
      new Paragraph({ spacing: { before: 80 } }),

      heading2("Task 1 – Initialize the Lab"),
      numberedItem("In Cloud Shell, set project variables:", "steps10"),
      code("export PROJECT_ID=$(gcloud config get-value project)"),
      code("export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')"),
      code("export REGION=us-central1"),
      numberedItem("Enable required APIs:", "steps10"),
      code("gcloud services enable container.googleapis.com \\\n  cloudbuild.googleapis.com \\\n  sourcerepo.googleapis.com \\\n  containeranalysis.googleapis.com \\\n  artifactregistry.googleapis.com"),
      numberedItem("Create Artifact Registry repository:", "steps10"),
      code("gcloud artifacts repositories create my-repository \\\n  --repository-format=docker \\\n  --location=$REGION"),
      numberedItem("Create GKE cluster:", "steps10"),
      code("gcloud container clusters create hello-cloudbuild \\\n  --num-nodes 1 \\\n  --region $REGION"),

      heading2("Task 2 – Create Git Repositories"),
      numberedItem("In Cloud Shell:", "steps10"),
      code("cd ~\ngcloud source repos create hello-cloudbuild-app\ngcloud source repos create hello-cloudbuild-env"),
      numberedItem("Clone app repo and add sample code:", "steps10"),
      code("git clone https://github.com/GoogleCloudPlatform/gke-gitops-tutorial-cloudbuild \\\n  hello-cloudbuild-app"),
      code("cd ~/hello-cloudbuild-app\ngit remote add google \\\n  https://source.developers.google.com/p/$PROJECT_ID/r/hello-cloudbuild-app"),

      heading2("Task 3 – Create Container Image with Cloud Build"),
      numberedItem("Build manually first:", "steps10"),
      code("cd ~/hello-cloudbuild-app\ngcloud builds submit --tag \\\n  $REGION-docker.pkg.dev/$PROJECT_ID/my-repository/hello-cloudbuild:latest"),
      numberedItem("Check Artifact Registry for the stored image:", "steps10"),
      numberedItem("Go to Navigation Menu > Artifact Registry > Repositories > my-repository.", "steps10"),

      heading2("Task 4 – Create the CI Pipeline"),
      numberedItem("The cloudbuild.yaml in the app repo defines build steps:", "steps10"),
      code("# cloudbuild.yaml example\nsteps:\n  - name: 'gcr.io/cloud-builders/docker'\n    args: ['build', '-t', '$_TAG', '.']\n  - name: 'gcr.io/cloud-builders/docker'\n    args: ['push', '$_TAG']\nimages: ['$_TAG']"),
      numberedItem("Create Cloud Build trigger: Navigation Menu > Cloud Build > Triggers > Create Trigger.", "steps10"),
      numberedItem("Connect to the Cloud Source Repo, select hello-cloudbuild-app, use cloudbuild.yaml.", "steps10"),
      numberedItem("Push code to trigger the pipeline:", "steps10"),
      code("git add . && git commit -m 'Initial commit'\ngit push google master"),
      numberedItem("Go to Cloud Build > History to watch the build run.", "steps10"),

      heading2("Task 5 – SSH Keys for GitHub Access"),
      numberedItem("Generate an SSH key pair:", "steps10"),
      code("ssh-keygen -t rsa -b 4096 -N '' -f ~/.ssh/id_github -C github"),
      numberedItem("Add the public key to GitHub (Settings > SSH and GPG keys).", "steps10"),
      numberedItem("Store private key in Secret Manager:", "steps10"),
      code("gcloud secrets create github-key --data-file=/root/.ssh/id_github"),
      code("gcloud secrets add-iam-policy-binding github-key \\\n  --member=serviceAccount:$PROJECT_NUMBER@cloudbuild.gserviceaccount.com \\\n  --role=roles/secretmanager.secretAccessor"),

      heading2("Task 6 – Create CD Pipeline and Test Rollback"),
      numberedItem("The CD pipeline (in cloudbuild-delivery.yaml) applies the Kubernetes manifest:", "steps10"),
      code("# Apply manifest to cluster\ngcloud container clusters get-credentials hello-cloudbuild \\\n  --region $REGION\nkubectl apply -f kubernetes.yaml"),
      numberedItem("Test complete pipeline: make a code change, commit, push, watch CI build, then CD deploy.", "steps10"),
      numberedItem("Rollback: In Cloud Build > History, click any previous successful build > Rebuild.", "steps10"),
      noteBox("CI pipeline: code push > build image > push to Artifact Registry > update manifest. CD pipeline: manifest change > apply to GKE cluster."),
      pageBreak(),

      // ── QUICK REFERENCE SHEET ──────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "QUICK REFERENCE: Key Commands", bold: true, size: 32, font: "Arial", color: "1F4E79" })],
        spacing: { before: 0, after: 200 }
      }),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [3000, 6360],
        rows: [
          new TableRow({ children: [
            new TableCell({ borders, shading: { fill: "1F4E79", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Service", bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })] }),
            new TableCell({ borders, shading: { fill: "1F4E79", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: "Key Command(s)", bold: true, size: 20, font: "Arial", color: "FFFFFF" })] })] }),
          ]}),
          ...([
            ["Compute Engine (VM)", "gcloud compute instances create NAME --machine-type=e2-medium --zone=ZONE"],
            ["SSH to VM", "gcloud compute ssh VM_NAME --zone=ZONE"],
            ["App Engine Deploy", "gcloud app deploy  |  gcloud app browse"],
            ["Cloud Storage", "gsutil mb gs://BUCKET  |  gsutil cp FILE gs://BUCKET/  |  gsutil ls gs://BUCKET"],
            ["Cloud SQL Connect", "gcloud sql connect INSTANCE --user=root --quiet"],
            ["Pub/Sub (CLI)", "gcloud pubsub topics create TOPIC  |  gcloud pubsub subscriptions pull --auto-ack SUB"],
            ["VPC Create", "gcloud compute networks create NETWORK --subnet-mode=auto"],
            ["VPC Peering", "gcloud compute networks peerings create PEER --network=A --peer-network=B"],
            ["Cloud Build Submit", "gcloud builds submit --tag IMAGE_TAG"],
            ["GKE Cluster", "gcloud container clusters create NAME --num-nodes=1 --region=REGION"],
            ["kubectl apply", "kubectl apply -f kubernetes.yaml"],
            ["Enable API", "gcloud services enable SERVICE_NAME.googleapis.com"],
            ["List Projects", "gcloud projects list  |  gcloud config list project"],
            ["Set Region/Zone", "gcloud config set compute/region REGION"],
          ].map(([svc, cmd]) => new TableRow({ children: [
            new TableCell({ borders, shading: { fill: "EBF3FB", type: ShadingType.CLEAR }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 3000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: svc, bold: true, size: 18, font: "Arial" })] })] }),
            new TableCell({ borders, margins: { top: 80, bottom: 80, left: 120, right: 120 }, width: { size: 6360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun({ text: cmd, size: 17, font: "Courier New", color: "C0392B" })] })] }),
          ]})))
        ]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/Cloud_Computing_Lab_Notes.docx', buffer);
  console.log('Done!');
});